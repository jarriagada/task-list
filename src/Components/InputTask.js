import { useState } from "react";
import { Select, Input, Button, Grid, Header, Icon } from "semantic-ui-react";
import {v4 as uuidv4 } from 'uuid';

const options = [
        {key: "deporte", text:"Deporte", value:"deporte" },
        {key: "casa", text:"Casa", value:"casa" },
        {key: "oficina", text:"Oficina", value:"oficina" },
        {key: "otra", text:"Otra", value:"otra" }
];


export default function InputTask(props) {

    const [error, setError] = useState(false);

    const {createTask} = props;

    const [task, setTask] = useState({
        idTask: "",
        taskName: "",
        categoryTask: ""
    });

    const onChangeTask = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        });
    };

    const onChangeCategoryTask = (e, data) => {
        setTask({
            ...task,
            [data.name]: data.value
        });
    };

    const onSubmitTask = (e) => {
       //que no recarge la paguina
        e.preventDefault();
       //validaciones
            if(task.taskName.trim() === "") {
            setError(true);
            return;
        }
       //eliminar el mensaje previo
       setError(false);
       //asignar un ID
        task.idTask = uuidv4();
       //crear la tarea
       createTask(task);

       //limpiar los Inputs
       setTask({
        idTask: "",
        taskName: "",
        categoryTask: ""
    });
};


    return (
        <>
            <Grid centered columns={2}>
                <Input type="text" action>
                    <Input
                        size="small"
                        icon="add"
                        placeholder="Escribe tu tarea..."
                        iconPosition="left"
                        name="taskName"
                        value={task.taskName}
                        onChange={onChangeTask}
                    />

                    <Select
                        compact
                        options={options}
                        className="select-form-task"
                        name="categoryTask"
                        placeholder="Categoria"
                        value={task.categoryTask}
                        onChange={onChangeCategoryTask}
                    />

                    <p></p>
                    <Button type="submit" color="violet" onClick={onSubmitTask}>
                        Añadir tarea
                    </Button>
                </Input>
            </Grid>
            {error && (
                <Grid centered>
                    <Header as="h4" color="red" className="alert-error-form">
                        <Icon name="close" />
                        <Header.Content>La tarea es obligatoria</Header.Content>
                        <Icon name="close" />
                    </Header>
                </Grid>
            )}
        </>
    );
}