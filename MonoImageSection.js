import React from 'react';

const MonoImageSection = () => {
  return (
    <section className="w-full p-8 flex justify-center items-center bg-[#2a9d8f]/10">
      <div className="max-w-2xl border-4 border-[#2a9d8f] rounded-lg overflow-hidden shadow-xl">
        <img 
          src="https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0fdGGHU3c6iCVp94hHM5LR1QUayJxrzbk73XZ" 
          alt="Imagen destacada" 
          className="w-full h-auto object-cover"
        />
      </div>
    </section>
  );
};

export default MonoImageSection;