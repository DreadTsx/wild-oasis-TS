import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
// import CabinTable from "./CabinTable";

export default function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          {(open) => <Button onClick={open}>Add New Cabin</Button>}
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// export default function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
//   const handleDisplayForm = () => {
//     setIsOpenModal((form) => !form);
//   };
//   return (
//     <div>
//       <Button onClick={handleDisplayForm}>Add new Cabin</Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }
