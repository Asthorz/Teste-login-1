import { NextResponse } from "next/server"; 


import bcrypt from "bcrypt";
export async function POST({request}) {
    const body = await request.json();
    const { email,password } = body;
    if(!email || !password){
        return NextResponse.json({error: 'Internal Server Error'},{ status: 400});
    }
    const emailReg = new RegExp(
        "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
      );
      if(!emailReg.test(email)){
        return NextResponse.json({error: 'Invalidade Email'},{ status: 400});
      }
      if(pass1.length < 8 ){
        return NextResponse.json({error: 'Invalidade Password'},{ status: 400});
    
      }
      const hash = bcrypt.hashSync(Password, 12);

    
}