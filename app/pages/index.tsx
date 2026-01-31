import { getAllInstitutes } from "@/lib/institute.service";
import Form from "../components/Form";
import Header from "../components/Header";
import InstituteTable from "../components/InstituteTable";

const Index = async () => {
  const institutes = await getAllInstitutes();
  
  return (
    <>
      <Header />
      <Form />
      <InstituteTable />
    </>
  );
};

export default Index;
