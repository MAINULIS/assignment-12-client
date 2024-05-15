import { GridLoader } from "react-spinners";

const Loader = () => {
    return ( 
        <div className="flex h-[70vh] justify-center items-center">
      <GridLoader size={30}  color='purple' />
    </div>
    );
};

export default Loader;