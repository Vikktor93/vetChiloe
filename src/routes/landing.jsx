// routes/Landing.jsx
import GradientBorderButton from '../components/GradientButton';

function Landing() {
  return (
    <main className='font-poppins flex flex-col w-full max-h-screen min-h-screen justify-center items-center landing-page'>
      <div className='flex flex-col mb-7 justify-around'>
        <h1 className='text-6xl font-bold text-[#ffff]'>VetChiloe</h1>
        <h2 className='text-5xl font-bold text-[#ffff]'>Sistema De informacion</h2>
      </div>
      <GradientBorderButton link={"home"} buttonText='Ingresar' />
    </main>
  );
}

export default Landing;   