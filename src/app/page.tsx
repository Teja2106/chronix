import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="h-screen flex-col justify-center items-center">
        <div>
          <h1 className=" text-4xl font-bitcount-single">
            Chronix
          </h1>
        </div>

        <div>
          <p className="font-darker-grotesque">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic ratione est cum sapiente deserunt tempore nisi esse qui! Consequatur cum accusantium distinctio at nesciunt veniam, molestias eos perspiciatis aperiam aspernatur.</p>
        </div>
      </div>
    </>
  );
}
