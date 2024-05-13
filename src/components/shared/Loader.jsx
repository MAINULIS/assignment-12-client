import { GridLoader } from "react-spinners";

const Loader = () => {
    return ( 
        <div className="flex h-[70vh] justify-center items-center">
      <GridLoader size={40} color='purple' />
    </div>
    );
};

export default Loader;