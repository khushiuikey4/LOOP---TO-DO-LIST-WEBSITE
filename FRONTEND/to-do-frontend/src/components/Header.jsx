import logo from "../Images/Logo.png";
import { IoIosAdd } from "react-icons/io";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
const NavBarComponent = ({ handleTaskForm }) => {
    return (
        <header className="w-full bg-white px-4 py-5 select-none sm:px-6 sm:py-6 lg:px-10 lg:py-8">

            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">

                {/* Logo */}
                <div className="flex cursor-pointer select-none items-center gap-3 pr-2 sm:pr-4">

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#292729] sm:h-10 sm:w-10">
                        <div className="h-3.5 w-3.5 rounded-[5px] bg-[#C05A3D] sm:h-4 sm:w-4"></div>
                    </div>

                    <span className="cursor-pointer select-none text-xl font-bold text-[#101010] sm:text-2xl">
                        Loop
                    </span>

                </div>

                {/* Center accent */}
                <div className="order-3 hidden flex-1 items-center justify-center px-6 sm:order-none sm:flex">
                    <div className="h-px w-full max-w-[160px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

                    <div className="mx-2 h-1 w-1 rotate-45 bg-[#C95739]"></div>

                    <div className="h-px w-full max-w-[160px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                </div>

                {/* Add */}
                <button
                    onClick={handleTaskForm}
                    className="
                        order-2 flex h-10 w-10 cursor-pointer
                        items-center justify-center
                        rounded-full bg-[#C05A3D]
                        text-2xl text-white
                        ring-4 ring-[#C05A3D]/10
                        transition-all duration-200
                        hover:scale-105
                        hover:bg-[#B94B30]
                        hover:shadow-lg
                        active:scale-90
                        sm:order-none sm:h-12 sm:w-12
                    "
                >
                    <IoIosAdd />
                </button>

            </div>

        </header>
    );
};
export default NavBarComponent;