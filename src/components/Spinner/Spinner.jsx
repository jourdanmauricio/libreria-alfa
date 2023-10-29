import './spinner.css';

const Spinner = () => {
  return (
    <div className="absolute top-0 left-0 flex justify-center items-center  w-full h-[105%] z-10 bg-slate-50 opacity-40 dark:bg-slate-950">
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;
