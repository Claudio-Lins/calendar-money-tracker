import { ScreenMode } from "@/components/ScreenMode";
import { InputSimple } from "@claudiolins-dev/claudiolins-lib";

export function Header() {
  return (
    <div className="w-full flex justify-between items-center bg-zinc-800 text-zinc-300 p-2 border-b border-zinc-600">
      <div className=" w-full ">
        <ScreenMode />
      </div>
      <div className="border rounded-md flex justify-center bg-transparent border-zinc-600 text-xs divide-x divide-zinc-500">
        <button className="w-16 px-2 py-1 hover:bg-zinc-700 transition-all duration-300">
          Day
        </button>
        <button className="w-16 px-2 py-1 hover:bg-zinc-700 transition-all duration-300">
          Week
        </button>
        <button className="w-16 px-2 py-1 hover:bg-zinc-700 transition-all duration-300">
          Month
        </button>
        <button className="w-16 px-2 py-1 hover:bg-zinc-700 transition-all duration-300">
          Year
        </button>
      </div>
      <div className="flex items-center justify-end w-full">
        <InputSimple
          label="Search"
          placeholder="Search"
          search
          className={"border-none"}
          classNameInput="ring-zinc-600"
        />
      </div>
    </div>
  );
}
