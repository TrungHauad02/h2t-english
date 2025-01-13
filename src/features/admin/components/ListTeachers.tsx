import { teachers } from "../services/mockData";
import ListUser from "./ListUsers/ListUsers";

const ListTeachers = () => {
    return(
        <ListUser users={teachers} title="List teachers" />
    )
}

export default ListTeachers;