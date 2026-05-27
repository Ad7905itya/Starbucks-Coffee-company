import React from 'react';
import { useNavigate } from 'react-router-dom';

const BreadcrumbNav = ({ items = [] }) => {
  const navigate = useNavigate();

  return (
    <div className='hidden lg:block m-auto px-8 py-2 max-w-[1300px] font-[Rubik] text-slate-700 text-sm'>
      <div className='flex items-center gap-2'>
        {items.map((item, index) => (
          <div key={index} className='flex items-center gap-2'>
            {item.path ? (
              <button
                onClick={() => navigate(item.path)}
                className='cursor-pointer hover:text-[#00754a] hover:underline transition-colors'
              >
                {item.label}
              </button>
            ) : (
              <span className='text-slate-700'>{item.label}</span>
            )}
            {index < items.length - 1 && <span className='text-slate-700'>&gt;</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BreadcrumbNav;
