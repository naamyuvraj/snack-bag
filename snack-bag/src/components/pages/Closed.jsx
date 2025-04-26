export default function Closed() {
  return (
    <div
      className="p-7 w-full min-h-screen"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >

        <h1 className="text-left text-4xl mt-4 font-semibold text-[#238b45] ml-6">
          Snack Bag
        </h1>
      <div className="flex flex-col items-center justify-center h-screen p-2 gap-10">  
        {/* <h1 className="text-4xl font-bold mb-4">Closed</h1> */}
      <p className="text-[#238b45] text-2xl">The store is currently under maintenance.</p>
      <br />
      <br />
      <p className="text-[#238b45] text-2xl">If you want to buy anything please visit room 315 😊.</p>
      </div>
    </div>
  );
}
