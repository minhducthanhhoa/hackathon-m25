import { NextRequest,NextResponse } from "next/server";
import fs from "fs"
import path from "path";


export const GET = async () => {
    const productsPath = path.join(process.cwd(), "database/db.json");
    const product = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
    return NextResponse.json(
        product ? product : {
            message: "Không thể lấy được tất cả sản phẩm"
        }
    )
}

export const POST = async (req:NextRequest) => {
    try {
        const productsPath = path.join(process.cwd(), "database/db.json");
        const product = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
        const newproduct = await req.json();
        product.push(newproduct);
        fs.writeFileSync(productsPath, JSON.stringify(product, null, 3), "utf-8");
        return NextResponse.json({
            message:"Thêm sản phẩm thành công"
        });
    } catch (error) {
        return NextResponse.json({
            message:"Thêm sản phẩm thất bại"
        })
    }
}