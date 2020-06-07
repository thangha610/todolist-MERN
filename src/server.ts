import app from "./app";
import { PORT } from "./constants/TodoAPIConstants";

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));