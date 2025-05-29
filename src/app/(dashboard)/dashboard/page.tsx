import CollapsibleTable from "@/components/CollapsibleTable/CollapsibleTable";
import style from "./style.module.css";

// id
// tittle
// amount
// categoryId
// userId
// createdDateAt
// updatedDateAt


export default async function DashboardPage() {
      
    // TRANSACTION
    const TransactionRes = await fetch('http://localhost:3000/api/transaction');
    const Transactionjson = await TransactionRes.json();
    const Transactiondata = Transactionjson.details;
    console.log(Transactiondata);

    //TRANSACTION CATEGORY
    const TransactionCategoryRes = await fetch('http://localhost:3000/api/transaction-category');
    const TransactionCategoryjson = await TransactionCategoryRes.json();
    const TransactionCategorydata = TransactionCategoryjson.details;
    console.log(TransactionCategorydata);

    //TRANSACTION TYPE
    const TransactionTypeRes = await fetch('http://localhost:3000/api/transaction-type');
    const TransactionTypejson = await TransactionTypeRes.json();
    const TransactionTypedata = TransactionTypejson.details;
    console.log(TransactionTypedata);

    const user = await fetch('http://localhost:3000/api/user');
    const userJson = await user.json();
    const userdata = userJson.details;
    console.log(userdata);

    return (
        
        <div className={style.section}>
        
            <CollapsibleTable rows={Transactiondata} categories={TransactionCategorydata} types={TransactionTypedata} users={userdata} />

        </div>
      );
}
