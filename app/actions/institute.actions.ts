"use server"

import { redirect } from "next/navigation";
import * as instituteService from "@/lib/institute.service";
export async function addInstitute(data: FormData) {
  const name = data.get("name") as string;
  const location = data.get("location") as string;
    // Call the service to add the institute

   const institute = await instituteService.addInstitute( name, location );
    
    console.log('in the server function  adding   Institute' + institute);
    redirect('/');
}

export async function deleteInstitute(id: number) {
    // Call the service to delete the institute
    console.log('in the server function  deleting   Institute')
}