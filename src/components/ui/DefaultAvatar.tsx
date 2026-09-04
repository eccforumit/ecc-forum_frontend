export default function DefaultAvatar() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
      <svg 
        className="w-1/2 h-1/2" 
        fill="currentColor" 
        viewBox="0 0 24 24"
      >
        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.1 3.89 23 5 23H19C20.1 23 21 22.1 21 21V9M12 7C14.21 7 16 8.79 16 11C16 13.21 14.21 15 12 15C9.79 15 8 13.21 8 11C8 8.79 9.79 7 12 7M6 19.5V18.5C6 16.57 8.96 15.5 12 15.5C15.04 15.5 18 16.57 18 18.5V19.5H6Z" />
      </svg>
    </div>
  );
}