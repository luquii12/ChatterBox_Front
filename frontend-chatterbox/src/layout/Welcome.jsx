

const Welcome = () => {
  return (
    <div className="min-h-screen background-primary text-secondary-color flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 -mt-[300px]">
        <h1 className="text-5xl sm:text-7xl font-bold primary-color mb-8">
          WELCOME TO CHATTERBOX
        </h1>
        <p className="max-w-2xl text-2xl sm:text-4xl secondary-color mb-6">
          CREATE A SERVER FOR YOU AND YOUR FRIENDS, YOUR COMMUNITY, OR YOUR TEAM.
          IT’S FREE, EASY, AND TOTALLY CUSTOMIZABLE.
        </p>
        <p className="text-xl sm:text-2xl secondary-color mb-10">
          START BY CREATING A GROUP OR JOIN AN EXISTING ONE TO GET STARTED.
        </p>

        <div className="flex gap-6">
          <button className="text-xl background-secondary text-white px-10 py-4 rounded-md hover:bg-[#2a2d44]">
            JOIN GROUP
          </button>
          <button className="text-xl bg-yellow-300 text-black px-10 py-4 rounded-md hover:bg-yellow-400 bg-primary-color  ">
            NEW GROUP
          </button>
        </div>
      </main>
    </div>
  );
};
export default Welcome;
