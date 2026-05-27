import React, { useEffect, useState } from 'react'
import { ConfigProvider, Modal, Checkbox } from 'antd'
import { useAuth } from '../../Hooks/useAuth'

const defaultAvatar = 'https://www.starbucks.in/assets/images/profileDP.svg'

// Convert date format from "MM/DD/YYYY" to "yyyy-MM-dd"
const convertToDateInputFormat = (dateStr) => {
  if (!dateStr) return ''
  const parts = dateStr.split('/')
  if (parts.length === 3) {
    const [month, day, year] = parts
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }
  return dateStr
}

// Convert date format from "yyyy-MM-dd" to "MM/DD/YYYY"
const convertFromDateInputFormat = (dateStr) => {
  if (!dateStr) return ''
  const parts = dateStr.split('-')
  if (parts.length === 3) {
    const [year, month, day] = parts
    return `${month}/${day}/${year}`
  }
  return dateStr
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
    preferences: {
      email: false,
      sms: false,
    },
    otp: '',
  })
  const [otpSent, setOtpSent] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [saving, setSaving] = useState(false)
  const [sendingOtp, setSendingOtp] = useState(false)
  const [nextStep, setNextStep] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (!user) return
    setForm({
      profilePhoto: user.profilePhoto || '',
      FirstName: user.FirstName || '',
      LastName: user.LastName || '',
      phone: user.phone || '',
      BirthDate: convertToDateInputFormat(user.BirthDate) || '',
      email: user.email || '',
      preferences: {
        email: !!user.preferences?.email,
        sms: !!user.preferences?.sms,
      },
      otp: '',
    })
    setStatusMessage('')
    setOtpSent(false)
  }, [user, open])

  const handleChange = (field, value) => {
    if (field === 'preferences') {
      setForm((prev) => ({ ...prev, preferences: { ...prev.preferences, ...value } }))
    } else {
      setForm((prev) => ({ ...prev, [field]: value }))
    }
  }

  const handleSendOtp = async () => {
    if (!user?.email) return
    setSendingOtp(true)
    setStatusMessage('Sending OTP...')
    try {
      const response = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, phone: user.phone }),
      })
      const result = await response.json()
      if (result.success) {
        setOtpSent(true)
        setStatusMessage('OTP sent to your registered email/phone. Enter it below to confirm changes.')
      } else {
        setStatusMessage(result.message || 'Unable to send OTP. Please try again.')
      }
    } catch (error) {
      setStatusMessage('OTP request failed. Please try again.')
    } finally {
      setSendingOtp(false)
      setNextStep(true);
    }
  }

  const handleSave = async () => {
    if (!form.otp) {
      setStatusMessage('Please confirm changes with the OTP before saving.')
      return
    }

    setSaving(true)
    setStatusMessage('Updating profile...')
    try {
      let profileUrl = form.profilePhoto;
      
      // If a file was selected, upload it first
      if (selectedFile) {
        try {
          setStatusMessage('Uploading image in chunks...')
          const uploaded = await uploadFileInChunks(selectedFile, (progress) => setUploadProgress(progress));
          if (uploaded?.success && uploaded?.url) {
            profileUrl = uploaded.url;
            setStatusMessage('Image uploaded. Saving profile...')
          } else {
            throw new Error('Upload response missing URL');
          }
        } catch (uploadError) {
          setStatusMessage(`Image upload failed: ${uploadError.message}. Proceeding without image.`)
          profileUrl = form.profilePhoto; // fallback to previous URL
        }
      }

      const response = await fetch('/api/auth/profile', {
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
          otp: form.otp,
        }),
      })
      const result = await response.json()
      if (result.success) {
        setUser(result.data)
        onSaved(result.data)
        setStatusMessage('Profile updated successfully.')
        onClose()
      } else {
        setStatusMessage(result.message || 'Could not update profile. Please check OTP and try again.')
      }
    } catch (error) {
      console.error('Profile update error:', error);
      setStatusMessage('Profile update failed. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const ImageHandler = (e) => {
    e.preventDefault()
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file);
      // preview
      const previewUrl = URL.createObjectURL(file);
      handleChange('profilePhoto', previewUrl);
    }
  }

  const uploadFileInChunks = async (file, onProgress) => {
    const chunkSize = 1024 * 1024; // 1MB
    const totalChunks = Math.ceil(file.size / chunkSize);
    const uploadId = (crypto && crypto.randomUUID) ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);

      const res = await fetch('/api/uploads/chunk', {
        method: 'POST',
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

    const completeRes = await fetch('/api/uploads/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uploadId, fileName: file.name, totalChunks }),
    });

    if (!completeRes.ok) {
      const errorData = await completeRes.json();
      throw new Error(errorData.message || 'Complete upload failed');
    }
    
    const result = await completeRes.json();
    if (result.success && result.url) {
      return result; // returns { success: true, url: '...' }
    } else {
      throw new Error('Upload completion returned invalid response');
    }
  }

  return (
    <ConfigProvider theme={{ cssVar: true }}>
      <Modal open={open} onCancel={onClose} footer={false} width={700} closeIcon>
        <div className='space-y-8 space-x-3 p-5'>
          {!nextStep && <div className='flex items-center flex-col justify-center gap-4 py-5'>
            <label htmlFor="image">
              <img
                src={form.profilePhoto || defaultAvatar}
                alt='Profile'
                className='w-28 cursor-pointer hover:opacity-40 h-28 flex justify-center items-center rounded-full object-cover border border-gray-200'
              />
              <input hidden type="file" id="image" accept="image/*" onChange={ImageHandler} />
            </label>
            <div className='text-center font-[Rubik]'>
              <h2 className='text-xl font-bold'>Edit Profile</h2>
              <p className='text-sm text-gray-500'>Update your name, phone, birthdate, and photo.</p>
            </div>
          </div>}

          {!nextStep && <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <label className='space-y-2'>
              <span className='font-semibold'>First name</span>
              <input
                value={form.FirstName}
                onChange={(e) => handleChange('FirstName', e.target.value)}
                className='w-full rounded-lg border px-4 py-2 outline-none'
              />
            </label>
            <label className='space-y-2'>
              <span className='font-semibold'>Last name</span>
              <input
                value={form.LastName}
                onChange={(e) => handleChange('LastName', e.target.value)}
                className='w-full rounded-lg border px-4 py-2 outline-none'
              />
            </label>
          </div>}

          {!nextStep && <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <label className='space-y-2'>
              <span className='font-semibold'>Phone</span>
              <input
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className='w-full rounded-lg border px-4 py-2 outline-none'
                type='tel'
              />
            </label>
            <label className='space-y-2'>
              <span className='font-semibold'>Birthday</span>
              <input
                value={form.BirthDate}
                onChange={(e) => handleChange('BirthDate', e.target.value)}
                className='w-full rounded-lg border px-4 py-2 outline-none'
                type='date'
              />
            </label>
          </div>}

          {!nextStep && <label className='space-y-2'>
            <span className='font-semibold'>Email</span>
            <input
              value={form.email}
              disabled
              className='w-full rounded-lg border bg-gray-100 px-4 py-2 outline-none'
            />
          </label>}

          {!nextStep && <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <label className='flex items-center gap-2'>
              <Checkbox
                checked={form.preferences.email}
                onChange={(e) => handleChange('preferences', { email: e.target.checked })}
              />
              <span>Email updates</span>
            </label>
            <label className='flex items-center gap-2'>
              <Checkbox
                checked={form.preferences.sms}
                onChange={(e) => handleChange('preferences', { sms: e.target.checked })}
              />
              <span>SMS updates</span>
            </label>
          </div>}

          <div className='grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto]'>
            {!nextStep ? <button
              onClick={handleSendOtp}
              disabled={sendingOtp}
              className='rounded-3xl bg-[#00754a] px-6 py-3 text-white transition hover:bg-[#005d3d] disabled:opacity-60'
            >
              {sendingOtp ? 'Sending OTP...' : otpSent ? 'Resend OTP' : 'Send OTP'}
            </button> :
              <label className='space-y-2'>
                <span className='font-semibold'>OTP</span>
                <input
                  value={form.otp}
                  onChange={(e) => handleChange('otp', e.target.value)}
                  className='w-full rounded-lg border px-4 py-2 outline-none'
                  placeholder='Enter OTP'
                />
              </label>}
          </div>

          {statusMessage && <p className='text-sm text-[#333]'>{statusMessage}</p>}

          {nextStep && <div className='flex justify-end gap-3'>
            <button
              onClick={() => {
                setNextStep(false);
                setStatusMessage('');
                setOtpSent(false);
                setSaving(false);
                setSendingOtp(false);
                onClose();
              }}
              className='rounded-3xl border border-[#ccc] px-6 py-3 font-semibold'
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className='rounded-3xl bg-[#00754a] px-6 py-3 text-white transition hover:bg-[#005d3d] disabled:opacity-60'
            >
              {saving ? 'Updating...' : 'Save Changes'}
            </button>
          </div>}
        </div>
      </Modal>
    </ConfigProvider>
  )
}

export default EditProfileModal
