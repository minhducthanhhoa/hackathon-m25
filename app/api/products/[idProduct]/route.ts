import fs from "fs";
import path from "path";
import { Product } from "@/app/page";
import { NextRequest, NextResponse } from "next/server";

export interface Props{
    params: {
        idProduct:string;
    }
}
export const GET = async (req:NextRequest, {params}: Props) =>{
    const {idProduct} = params;
    const productsPath = path.join(process.cwd(), "database/db.json");
    const product = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
    const searchProduct = product.find((item:Product)=> item.id === +idProduct);
    return NextResponse.json(
        searchProduct ? searchProduct : {
            message:"Không thể lấy được sản phẩm theo id"
        }
    )
}

export const PUT = async (
    req:NextRequest,
    {params} : {params: {idProduct:string}}
) => {
    const {idProduct} = params;
    try {
        const productsPath = path.join(process.cwd(), "database/db.json");
        const product = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
        const searchIndex = product.findItem((item: {id:number}) => item.id === +idProduct);
        const editProduct = await req.json();

        if (searchIndex === -1){
            return NextResponse.json({
                message:"Không tìm thấy sản phẩm nào cần cập nhật"
            })
        }
        product[searchIndex] = {...product[searchIndex], ...editProduct};
        fs.writeFileSync(productsPath,JSON.stringify(product, null, 3));
        return NextResponse.json({
            message:"Cập nhật sản phẩm thành công"
        })
    } catch (error) {
        return NextResponse.json({
            message:"Không thể cập nhật sản phẩm"
        })
    }
}
export const DELETE = async (req:NextRequest, {params}:Props)=>{
    const {idProduct} = params;
    try {
        const productsPath = path.join(process.cwd(), "database/db.json");
        const product = JSON.parse(fs.readFileSync(productsPath, "utf8"));
        const searchProduct = product.filter((item:Product)=>item.id !== +idProduct);
        fs.writeFileSync(productsPath, JSON.stringify(searchProduct, null, 3), "utf-8");
        return NextResponse.json({ message: "Xóa sản phẩm thành công" });
    } catch (error) {
        return NextResponse.json({
            message:"Xóa thất bại"
        })
    }
}