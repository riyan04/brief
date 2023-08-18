import { logo } from '../assets';

const Hero = () => {
  return (
    <header className=' w-full flex justify-center items-center flex-col'>
      <nav className=' flex justify-between items-center w-full mb-10 pt-3'>
        <img 
          src={logo}
          alt='Brief_logo'
          className=' w-28 object-contain'
        />
        <button
          type='button'
          onClick={() => window.open('https://github.com/riyan04')}
          className=' black_btn'
        >
          Source Code
        </button>
      </nav>

      <h1 className='head_text'>
        Quickly <span className='orange_gradient'>Summarize</span> any Article with <br className=' max-md:hidden' /> Brief
      </h1>
      <h2 className=' desc'>
        Increase your productivity with the help of BRIEF and get the most out of the article without reading it completely
      </h2>
    </header>
  )
}

export default Hero