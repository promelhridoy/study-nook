import { use } from "react";
import DetailsPage from "@/components/shared/DetailsPage";
import AnotherRooms from "@/components/shared/AnotherRooms";

const RoomDetailsPage = ({ params }) => {
  const { id } = use(params); 

  console.log("Resolved ID:", id);

  return(
    <div>
      <DetailsPage id={id} />
      <AnotherRooms id={id} />
    </div>
  );
};

export default RoomDetailsPage;