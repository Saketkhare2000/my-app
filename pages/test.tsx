import { Form } from "@/components/page/Form";
import { fields } from "@/data/data";

export default function App() {
    return (
        <div className="App">
            <Form fields={fields} />
        </div>
    );
}
