import { students } from "../services/mockData";
import ListUser from "./ListUsers";

const ListStudents = () => {
    return(
        <ListUser users={students} />
    )
}

export default ListStudents;