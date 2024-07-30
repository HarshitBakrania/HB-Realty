export const PhoneIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-8"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
      />
    </svg>
  );
};

export const HomeIcon = () => {
  return (
    <div className="cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="black"
        class="size-8"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    </div>
  );
};

export const MailIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
      />
    </svg>
  );
};

export const MapPin = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-8"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
      />
    </svg>
  );
};

export const InstagramIcon = ({size, color}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
};

export const AddIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
}

export const CheckCircle = () =>{
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
}

export const BathroomIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 30 30" version="1.1">
    <g id="surface1">
      <path
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "white",
          fillOpacity: 0.9,
        }}
        d="M 1.875 22.5 C 1.878906 24.09375 2.558594 25.609375 3.75 26.664062 L 3.75 29.0625 C 3.75 29.582031 4.167969 30 4.6875 30 L 6.5625 30 C 7.082031 30 7.5 29.582031 7.5 29.0625 L 7.5 28.125 L 22.5 28.125 L 22.5 29.0625 C 22.5 29.582031 22.917969 30 23.4375 30 L 25.3125 30 C 25.832031 30 26.25 29.582031 26.25 29.0625 L 26.25 26.664062 C 27.441406 25.609375 28.121094 24.09375 28.125 22.5 L 28.125 19.6875 L 1.875 19.6875 Z M 29.0625 15 L 4.6875 15 L 4.6875 4.0625 C 4.691406 3.558594 4.996094 3.105469 5.457031 2.914062 C 5.921875 2.722656 6.457031 2.828125 6.8125 3.179688 L 7.945312 4.3125 C 7.179688 6.0625 7.5 7.773438 8.449219 8.984375 L 8.4375 8.992188 C 8.078125 9.359375 8.078125 9.945312 8.4375 10.3125 L 9.101562 10.976562 C 9.464844 11.339844 10.058594 11.339844 10.421875 10.976562 L 16.601562 4.796875 C 16.964844 4.433594 16.964844 3.839844 16.601562 3.476562 L 15.9375 2.8125 C 15.570312 2.449219 14.980469 2.449219 14.613281 2.8125 L 14.601562 2.824219 C 13.394531 1.875 11.683594 1.546875 9.929688 2.320312 L 8.800781 1.1875 C 7.640625 0.03125 5.894531 -0.3125 4.378906 0.316406 C 2.867188 0.945312 1.878906 2.421875 1.875 4.0625 L 1.875 15 L 0.9375 15 C 0.417969 15 0 15.417969 0 15.9375 L 0 16.875 C 0 17.394531 0.417969 17.8125 0.9375 17.8125 L 29.0625 17.8125 C 29.582031 17.8125 30 17.394531 30 16.875 L 30 15.9375 C 30 15.417969 29.582031 15 29.0625 15 Z M 29.0625 15 "
      />
    </g>
  </svg>
);

export default function TextIcon(){
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
</svg>
}

export function Bookmark(){
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
</svg>
}