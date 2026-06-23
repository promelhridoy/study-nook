import DetailsPage from "@/components/shared/DetailsPage";
import AnotherRooms from "@/components/shared/AnotherRooms";


const RoomDetailsPage = async ({ params }) => {
  const { id } = await params;

  return (
    <div>
      <DetailsPage id={id} />
      <AnotherRooms id={id} />
    </div>
  );
};

export default RoomDetailsPage;