import { students } from "../services/mockData";
import ListUser from "./ListUsers/ListUsers";

const ListStudents = () => {
    return(
        <ListUser users={students} title="List students" />
    )
}

export default ListStudents;