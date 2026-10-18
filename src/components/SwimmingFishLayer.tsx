import React from 'react';

export const SwimmingFishLayer: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-20 overflow-hidden"
      id="fish-animation-overlay"
    >
      {/* Fish 1: Sky Pastel Blue doodle */}
      <div
        className="fish-swimming-particle w-12 h-9 left-[5%] md:left-[10%]"
        style={{ animation: 'fishSwimDownRight 14s 0s infinite ease-in-out' }}
      >
        <svg className="w-full h-full overflow-visible" fill="none" viewBox="0 0 48 34" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 17 C11 7, 24 6, 33 13 C35 15, 36 17, 36 17 C36 17, 35 19, 33 21 C24 28, 11 27, 7 17 Z"
            fill="#93C5FD"
            fillOpacity="0.8"
            stroke="#3B82F6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
          <path d="M19 8 C22 3, 26 4, 27 9" fill="#BFDBFE" fillOpacity="0.85" stroke="#3B82F6" strokeLinecap="round" strokeWidth="1.5" />
          <path d="M18 25 C21 29, 24 28, 25 24" fill="#BFDBFE" stroke="#3B82F6" strokeLinecap="round" strokeWidth="1.5" />
          <g className="fish-tail">
            <path
              d="M34 17 C39 10, 44 8, 46 11 C43 15, 43 19, 46 23 C44 26, 39 24, 34 17 Z"
              fill="#60A5FA"
              fillOpacity="0.85"
              stroke="#2563EB"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.6"
            />
          </g>
          <path d="M17 14 C19 15.5, 19 18.5, 17 20" stroke="#2563EB" strokeLinecap="round" strokeWidth="1.4" />
          <path d="M22 13 C24 15, 24 19, 22 21" stroke="#2563EB" strokeLinecap="round" strokeWidth="1.4" />
          <circle cx="12" cy="14" fill="#1E3A8A" r="2.2" />
          <circle cx="11.2" cy="13.2" fill="#FFFFFF" r="0.8" />
          <ellipse cx="12" cy="19" fill="#F472B6" fillOpacity="0.65" rx="1.8" ry="1.2" />
        </svg>
      </div>

      {/* Fish 2: Soft Aquamarine Turquoise */}
      <div
        className="fish-swimming-particle w-10 h-7.5 left-[24%] md:left-[28%]"
        style={{ animation: 'fishSwimDownLeft 11.8s 2.2s infinite ease-in-out' }}
      >
        <svg className="w-full h-full overflow-visible" fill="none" viewBox="0 0 48 34" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 17 C11 7, 24 6, 33 13 C35 15, 36 17, 36 17 C36 17, 35 19, 33 21 C24 28, 11 27, 7 17 Z"
            fill="#A7F3D0"
            fillOpacity="0.85"
            stroke="#10B981"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
          <path d="M19 8 C22 3, 26 4, 27 9" fill="#D1FAE5" fillOpacity="0.9" stroke="#10B981" strokeLinecap="round" strokeWidth="1.5" />
          <path d="M18 25 C21 29, 24 28, 25 24" fill="#D1FAE5" stroke="#10B981" strokeLinecap="round" strokeWidth="1.5" />
          <g className="fish-tail">
            <path
              d="M34 17 C39 10, 44 8, 46 11 C43 15, 43 19, 46 23 C44 26, 39 24, 34 17 Z"
              fill="#6EE7B7"
              fillOpacity="0.9"
              stroke="#059669"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.6"
            />
          </g>
          <circle cx="12" cy="14" fill="#064E3B" r="2.2" />
          <circle cx="11.2" cy="13.2" fill="#FFFFFF" r="0.8" />
          <ellipse cx="12" cy="19" fill="#F472B6" fillOpacity="0.6" rx="1.6" ry="1.1" />
        </svg>
      </div>

      {/* Fish 3: Periwinkle Lavender-Blue */}
      <div
        className="fish-swimming-particle w-12 h-9 left-[50%]"
        style={{ animation: 'fishSwimDownRight 15.5s 4.5s infinite ease-in-out' }}
      >
        <svg className="w-full h-full overflow-visible" fill="none" viewBox="0 0 48 34" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 17 C11 7, 24 6, 33 13 C35 15, 36 17, 36 17 C36 17, 35 19, 33 21 C24 28, 11 27, 7 17 Z"
            fill="#BAE6FD"
            fillOpacity="0.85"
            stroke="#0284C7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
          <path d="M19 8 C22 3, 26 4, 27 9" fill="#E0F2FE" fillOpacity="0.85" stroke="#0284C7" strokeLinecap="round" strokeWidth="1.5" />
          <g className="fish-tail">
            <path
              d="M34 17 C39 10, 44 8, 46 11 C43 15, 43 19, 46 23 C44 26, 39 24, 34 17 Z"
              fill="#7DD3FC"
              stroke="#0369A1"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.6"
            />
          </g>
          <circle cx="12" cy="14" fill="#0C4A6E" r="2.2" />
          <circle cx="11.2" cy="13.2" fill="#FFFFFF" r="0.8" />
          <ellipse cx="12" cy="19" fill="#FB7185" fillOpacity="0.65" rx="1.8" ry="1.2" />
        </svg>
      </div>

      {/* Fish 4: Deep Sky Blue doodle */}
      <div
        className="fish-swimming-particle w-9 h-7 left-[72%] md:left-[76%]"
        style={{ animation: 'fishSwimDownLeft 12.2s 1.2s infinite ease-in-out' }}
      >
        <svg className="w-full h-full overflow-visible" fill="none" viewBox="0 0 48 34" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 17 C11 7, 24 6, 33 13 C35 15, 36 17, 36 17 C36 17, 35 19, 33 21 C24 28, 11 27, 7 17 Z"
            fill="#C7D2FE"
            fillOpacity="0.85"
            stroke="#6366F1"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
          <g className="fish-tail">
            <path
              d="M34 17 C39 10, 44 8, 46 11 C43 15, 43 19, 46 23 C44 26, 39 24, 34 17 Z"
              fill="#A5B4FC"
              stroke="#4F46E5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.6"
            />
          </g>
          <circle cx="12" cy="14" fill="#312E81" r="2.2" />
          <circle cx="11.2" cy="13.2" fill="#FFFFFF" r="0.8" />
          <ellipse cx="12" cy="19" fill="#F472B6" fillOpacity="0.6" rx="1.6" ry="1.1" />
        </svg>
      </div>

      {/* Fish 5: Delicate Baby Blue Partner */}
      <div
        className="fish-swimming-particle w-8 h-6 left-[86%]"
        style={{ animation: 'fishSwimDownRight 13.8s 7.1s infinite ease-in-out' }}
      >
        <svg className="w-full h-full overflow-visible" fill="none" viewBox="0 0 48 34" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 17 C11 7, 24 6, 33 13 C35 15, 36 17, 36 17 C36 17, 35 19, 33 21 C24 28, 11 27, 7 17 Z"
            fill="#93C5FD"
            fillOpacity="0.8"
            stroke="#3B82F6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
          <circle cx="12" cy="14" fill="#1E3A8A" r="2.2" />
          <ellipse cx="12" cy="19" fill="#F472B6" fillOpacity="0.6" rx="1.5" ry="1" />
        </svg>
      </div>
    </div>
  );
};
