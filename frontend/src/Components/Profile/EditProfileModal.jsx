import React, { useEffect, useState } from 'react'
import { ConfigProvider, Modal, Checkbox } from 'antd'
import { useAuth } from '../../Hooks/useAuth'

const defaultAvatar = 'https://www.starbucks.in/assets/images/profileDP.svg'
const MAX_FILE_SIZE = 500 * 1024; // 500 KB

const normalizeDateInput = (dateStr) => {
  if (!dateStr) return ''
  const trimmed = String(dateStr).trim()
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed

  const parts = trimmed.split('/')
  if (parts.length === 3) {
    const [month, day, year] = parts
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }
  return trimmed
}

const convertFromDateInputFormat = (dateStr) => {
  if (!dateStr) return ''
  const trimmed = String(dateStr).trim()
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    const [year, month, day] = trimmed.split('-')
    return `${month}/${day}/${year}`
  }
  return trimmed
}

const EditProfileModal = ({ open, onClose, onSaved }) => {
  const { user, setUser } = useAuth()
  const [form, setForm] = useState({
    profilePhoto: '',
    FirstName: '',
    LastName: '',
    phone: '',
    BirthDate: '',
    email: '',
    preferences: { email: false, sms: false }
  })

  const [statusMessage, setStatusMessage] = useState('')
  const [saving, setSaving] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  useEffect(() => {
    if (!user) return
    setForm({
      profilePhoto: user.profilePhoto || '',
      FirstName: user.FirstName || '',
      LastName: user.LastName || '',
      phone: user.phone || '',
      BirthDate: normalizeDateInput(user.BirthDate) || '',
      email: user.email || '',
      preferences: {
        email: !!user.preferences?.email,
        sms: !!user.preferences?.sms,
      }
    })
    setStatusMessage('')
    setSelectedFile(null)
    setUploadProgress(0)
    setSaving(false)
  }, [user, open])

  const handleChange = (field, value) => {
    if (field === 'preferences') {
      setForm((prev) => ({ ...prev, preferences: { ...prev.preferences, ...value } }))
    } else {
      setForm((prev) => ({ ...prev, [field]: value }))
    }
  }

  const ImageHandler = (e) => {
    e.preventDefault()
    const file = e.target.files[0]
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setSelectedFile(null)
        setStatusMessage('Image must be 500KB or smaller.')
        return
      }

      setSelectedFile(file)
      setStatusMessage('')
      const previewUrl = URL.createObjectURL(file)
      handleChange('profilePhoto', previewUrl)
    }
  }

  const uploadFileInChunks = async (file, onProgress) => {
    const chunkSize = 1024 * 1024; // 1MB
    const totalChunks = Math.ceil(file.size / chunkSize);
    const uploadId = (crypto && crypto.randomUUID) 
      ? crypto.randomUUID() 
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/uploads/chunk`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/octet-stream',
          'Upload-Id': uploadId,
          'Chunk-Index': String(i),
          'File-Name': file.name,
        },
        body: chunk,
      });

      if (!res.ok) throw new Error('Upload chunk failed');
      const progress = Math.round(((i + 1) / totalChunks) * 100);
      onProgress && onProgress(progress);
    }

    const completeRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/uploads/complete`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uploadId, fileName: file.name, totalChunks }),
    });

    if (!completeRes.ok) {
      const errorData = await completeRes.json();
      throw new Error(errorData.message || 'Complete upload failed');
    }

    const result = await completeRes.json();
    if (result.success && result.url) {
      return result;
    } else {
      throw new Error('Upload completion returned invalid response');
    }
  }

  const executeProfileUpdate = async () => {
    setSaving(true)
    setStatusMessage('Updating profile...')
    try {
      const originalPhoto = user?.profilePhoto || '';
      let profileUrl = form.profilePhoto;

      if (selectedFile) {
        if (selectedFile.size > MAX_FILE_SIZE) {
          setStatusMessage('Image must be 500KB or smaller.')
          setSaving(false)
          return
        }

        try {
          setStatusMessage('Uploading image...')
          const uploaded = await uploadFileInChunks(selectedFile, (progress) => setUploadProgress(progress));
          if (uploaded?.success && uploaded?.url) {
            profileUrl = uploaded.url;
            handleChange('profilePhoto', uploaded.url);
          } else {
            throw new Error('Upload response missing URL');
          }
        } catch (uploadError) {
          console.error("Chunk Upload Error:", uploadError);
          setStatusMessage(`Image upload failed: ${uploadError.message}. keeping existing image.`)
          profileUrl = originalPhoto
        }
      }

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profilePhoto: profileUrl,
          FirstName: form.FirstName,
          LastName: form.LastName,
          phone: form.phone,
          BirthDate: convertFromDateInputFormat(form.BirthDate),
          preferences: form.preferences,
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        const updatedUser = result.data || result.user || form;
        setUser(updatedUser)
        if (onSaved) onSaved(updatedUser)
        
        setStatusMessage('Profile updated successfully!')
        
        // Modal close karne ka timing fix
        setTimeout(() => {
          setSaving(false)
          onClose()
        }, 500)
      } else {
        setStatusMessage(result.message || 'Could not update profile. Try again.')
        setSaving(false)
      }
    } catch (error) {
      console.error('Profile update error:', error);
      setStatusMessage('Profile update failed. Please try again.')
      setSaving(false)
    }
  }

  const handleSaveClick = () => {
    Modal.confirm({
      title: 'Update Profile Details?',
      content: 'Are you sure you want to update your profile details and photo?',
      okText: 'Yes, Update',
      cancelText: 'Cancel',
      okButtonProps: { style: { backgroundColor: '#00754a', borderColor: '#00754a' } },
      onOk() {
        executeProfileUpdate()
      },
    })
  }

  return (
    <ConfigProvider theme={{ cssVar: true }}>
      <Modal open={open} onCancel={onClose} footer={false} width={700} destroyOnClose>
        <div className='space-y-6 p-4'>
          <div className='flex items-center flex-col justify-center gap-4 py-2'>
            <label htmlFor="image" className="relative group cursor-pointer">
              <img
                src={form.profilePhoto || defaultAvatar}
                alt='Profile'
                className='w-28 h-28 rounded-full object-cover border border-gray-200 group-hover:opacity-60 transition'
              />
              <input hidden type="file" id="image" accept="image/*" onChange={ImageHandler} />
            </label>
            <div className='text-center font-[Rubik]'>
              <h2 className='text-xl font-bold'>Edit Profile</h2>
              <p className='text-sm text-gray-500'>Update your name, phone, birthdate, and photo.</p>
            </div>
          </div>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <label className='space-y-1 block'>
              <span className='font-semibold text-sm'>First name</span>
              <input
                value={form.FirstName}
                onChange={(e) => handleChange('FirstName', e.target.value)}
                className='w-full rounded-lg border px-4 py-2 outline-none focus:border-[#00754a]'
              />
            </label>
            <label className='space-y-1 block'>
              <span className='font-semibold text-sm'>Last name</span>
              <input
                value={form.LastName}
                onChange={(e) => handleChange('LastName', e.target.value)}
                className='w-full rounded-lg border px-4 py-2 outline-none focus:border-[#00754a]'
              />
            </label>
          </div>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <label className='space-y-1 block'>
              <span className='font-semibold text-sm'>Phone</span>
              <input
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className='w-full rounded-lg border px-4 py-2 outline-none focus:border-[#00754a]'
                type='tel'
              />
            </label>
            <label className='space-y-1 block'>
              <span className='font-semibold text-sm'>Birthday</span>
              <input
                value={form.BirthDate}
                onChange={(e) => handleChange('BirthDate', e.target.value)}
                className='w-full rounded-lg border px-4 py-2 outline-none focus:border-[#00754a]'
                type='date'
              />
            </label>
          </div>

          <label className='space-y-1 block'>
            <span className='font-semibold text-sm'>Email</span>
            <input
              value={form.email}
              disabled
              className='w-full rounded-lg border bg-gray-100 px-4 py-2 outline-none text-gray-500 cursor-not-allowed'
            />
          </label>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 pt-2'>
            <label className='flex items-center gap-2 cursor-pointer'>
              <Checkbox
                checked={form.preferences.email}
                onChange={(e) => handleChange('preferences', { email: e.target.checked })}
              />
              <span className='text-sm'>Email updates</span>
            </label>
            <label className='flex items-center gap-2 cursor-pointer'>
              <Checkbox
                checked={form.preferences.sms}
                onChange={(e) => handleChange('preferences', { sms: e.target.checked })}
              />
              <span className='text-sm'>SMS updates</span>
            </label>
          </div>

          {/* Status Message Display */}
          {statusMessage && (
            <div className='text-center'>
              <p className={`text-sm font-medium ${statusMessage.includes('failed') || statusMessage.includes('smaller') || statusMessage.includes('required') ? 'text-red-500' : 'text-[#00754a]'}`}>
                {statusMessage}
              </p>
              {saving && uploadProgress > 0 && uploadProgress < 100 && (
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div className="bg-[#00754a] h-1.5 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              )}
            </div>
          )}

          <div className='flex justify-between gap-3 items-center pt-2'>
            <button
              type="button"
              onClick={onClose}
              className='rounded-3xl grow border border-[#ccc] px-6 py-2.5 font-semibold text-gray-700 hover:bg-gray-50 transition'
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveClick}
              disabled={saving}
              className='rounded-3xl grow bg-[#00754a] px-6 py-2.5 text-white font-semibold transition hover:bg-[#005d3d] disabled:opacity-60'
            >
              {saving ? 'Updating...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  )
}

export default EditProfileModal