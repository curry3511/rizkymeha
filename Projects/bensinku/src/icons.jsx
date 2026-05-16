import React from 'react'

const Icon = ({ d, size = 22, sw = 1.75, fill = 'none', children, vb = 24 }) => (
  <svg width={size} height={size} viewBox={`0 0 ${vb} ${vb}`} fill={fill}
       stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {children || <path d={d} />}
  </svg>
);

export const IconHome     = (p) => <Icon {...p}><path d="M3 11.5L12 4l9 7.5"/><path d="M5 10.5V20h14v-9.5"/><path d="M10 20v-5h4v5"/></Icon>;
export const IconHistory  = (p) => <Icon {...p}><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v4h4"/><path d="M12 8v4l3 2"/></Icon>;
export const IconGarage   = (p) => <Icon {...p}><path d="M3 10.5L12 5l9 5.5V20H3z"/><path d="M3 13h18"/><path d="M3 17h18"/></Icon>;
export const IconWrench   = (p) => <Icon {...p}><path d="M14.7 6.3a4 4 0 0 1-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 1 5.4-5.4l-2.5 2.5-1.4-1.4z"/></Icon>;
export const IconPlus     = (p) => <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>;
export const IconCamera   = (p) => <Icon {...p}><path d="M3 8.5A2.5 2.5 0 0 1 5.5 6H8l1.5-2h5L16 6h2.5A2.5 2.5 0 0 1 21 8.5V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="3.5"/></Icon>;
export const IconKey      = (p) => <Icon {...p}><circle cx="8" cy="14" r="4"/><path d="M11 11l9-9"/><path d="M16 6l3 3"/></Icon>;
export const IconChevR    = (p) => <Icon {...p} sw={2}><path d="M9 6l6 6-6 6"/></Icon>;
export const IconChevL    = (p) => <Icon {...p} sw={2}><path d="M15 6l-6 6 6 6"/></Icon>;
export const IconChevD    = (p) => <Icon {...p} sw={2}><path d="M6 9l6 6 6-6"/></Icon>;
export const IconClose    = (p) => <Icon {...p} sw={2}><path d="M6 6l12 12M18 6L6 18"/></Icon>;
export const IconDrop     = (p) => <Icon {...p}><path d="M12 3s6 6.5 6 11a6 6 0 1 1-12 0c0-4.5 6-11 6-11z"/></Icon>;
export const IconCheck    = (p) => <Icon {...p} sw={2.2}><path d="M5 12.5l4.5 4.5L19 7"/></Icon>;
export const IconBolt     = (p) => <Icon {...p} fill="currentColor"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/></Icon>;
export const IconSpark    = (p) => <Icon {...p}><path d="M12 4v4M12 16v4M4 12h4M16 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M6.3 17.7l2.8-2.8M14.9 9.1l2.8-2.8"/></Icon>;
export const IconCalendar = (p) => <Icon {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></Icon>;
export const IconPin      = (p) => <Icon {...p}><path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/></Icon>;
export const IconReceipt  = (p) => <Icon {...p}><path d="M6 3h12v18l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5L6 21z"/><path d="M9 8h6M9 12h6M9 16h4"/></Icon>;
export const IconCar      = (p) => <Icon {...p}><path d="M5 17h14M5 17l-1-5 2-5h12l2 5-1 5M5 17v2M19 17v2"/><circle cx="8" cy="17" r="1.5"/><circle cx="16" cy="17" r="1.5"/></Icon>;
export const IconTrend    = (p) => <Icon {...p}><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></Icon>;
export const IconTrendDown= (p) => <Icon {...p}><path d="M3 7l6 6 4-4 8 8"/><path d="M14 17h7v-7"/></Icon>;
export const IconFilter   = (p) => <Icon {...p}><path d="M3 5h18l-7 9v6l-4-2v-4z"/></Icon>;
export const IconBell     = (p) => <Icon {...p}><path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15z"/><path d="M10 21a2 2 0 0 0 4 0"/></Icon>;
export const IconSettings = (p) => <Icon {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></Icon>;
export const IconStation  = (p) => <Icon {...p}><path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16"/><path d="M3 21h12"/><path d="M14 10h2a2 2 0 0 1 2 2v5a2 2 0 0 0 2 2 2 2 0 0 0 2-2V7l-3-3"/><path d="M7 7h4M7 11h4"/></Icon>;
export const IconTrash    = (p) => <Icon {...p}><path d="M4 7h16"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13"/><path d="M10 11v7M14 11v7"/></Icon>;
export const IconDots     = (p) => <Icon {...p} sw={0} fill="currentColor"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></Icon>;
export const IconEdit     = (p) => <Icon {...p}><path d="M16 3l5 5L8 21H3v-5z"/><path d="M13 6l5 5"/></Icon>;
export const IconAlert    = (p) => <Icon {...p}><path d="M12 9v4"/><circle cx="12" cy="17" r="0.6" fill="currentColor"/><path d="M10.3 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></Icon>;
export const IconStar     = (p) => <Icon {...p}><path d="M12 3l2.7 5.5 6 .9-4.4 4.2 1 6-5.3-2.8L6.7 19.6l1-6L3.3 9.4l6-.9z"/></Icon>;
export const IconFlash    = (p) => <Icon {...p} fill="currentColor" sw={0}><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/></Icon>;
export const IconGoogle   = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.6 20.5h-1.9V20H24v8h11.3a12 12 0 1 1-3.4-13l5.7-5.7A20 20 0 1 0 44 24c0-1.2-.1-2.4-.4-3.5z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8A12 12 0 0 1 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7A20 20 0 0 0 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44a20 20 0 0 0 13.5-5.2l-6.2-5.3A12 12 0 0 1 12.7 28l-6.6 5.1A20 20 0 0 0 24 44z"/>
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.3C40 36 44 30.6 44 24c0-1.2-.1-2.4-.4-3.5z"/>
  </svg>
);
export const IconApple    = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.1 12.8a5 5 0 0 1 2.4-4.2 5.2 5.2 0 0 0-4-2.2c-1.7-.2-3.3 1-4.2 1-.9 0-2.2-1-3.6-.9a5.4 5.4 0 0 0-4.6 2.8c-2 3.4-.5 8.4 1.4 11.2.9 1.3 2 2.8 3.4 2.8 1.4-.1 1.9-.9 3.6-.9 1.6 0 2.1.9 3.5.8 1.5 0 2.4-1.4 3.3-2.7a12 12 0 0 0 1.5-3 4.9 4.9 0 0 1-2.7-5.7zM14.4 4.6a4.9 4.9 0 0 0 1.1-3.5 5 5 0 0 0-3.2 1.7 4.5 4.5 0 0 0-1.2 3.4 4.1 4.1 0 0 0 3.3-1.6z"/>
  </svg>
);
