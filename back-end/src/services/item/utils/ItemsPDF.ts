import { ItemCompanyAttrs } from "../../../models/items";
const PDFDocument = require("pdfkit-table");

interface ItemPDFGenerator{
  generate(items: ItemCompanyAttrs[]): Promise<Buffer>
}


interface Item{
  name: string;
  description: string;
  price: string;
}

interface TableItems{
  title:string;
  headers: string[];
  rows: any[]
}

class ItemsPDF {

  table: TableItems = { 
    title: 'Items List',
    headers: ["Name", "Description", "Price"],
    rows: [],
  };

  items: ItemCompanyAttrs[];
  pdfDoc: any;

  constructor(items: ItemCompanyAttrs[]) {
    this.items = items;
    this.pdfDoc = new PDFDocument();
    this.pdfDoc.font('Helvetica-Bold');
  }
  
  async body(){
        // Agregamos los datos a la tabla
      for (const item of this.items)  {
          const name = item.name;
          const description = item.description;
          const price = `$${item.price.toFixed(2)}`;
          this.table.rows.push([name, description, price])
      }

      // or columnsSize
      await this.pdfDoc.table(this.table, { 
        columnsSize: [ 100, 200, 100 ],
      });
  }

  async buffer(){
    return await new Promise<Buffer>((resolve, reject) => {
      const buffers: any[] = [];
      this.pdfDoc.on('data', buffers.push.bind(buffers));
      this.pdfDoc.on('end', () => resolve(Buffer.concat(buffers)));
      this.pdfDoc.end();
    });
  }

  async generate() {
    await this.body();
    return await this.buffer();
  }
}

export default ItemsPDF;