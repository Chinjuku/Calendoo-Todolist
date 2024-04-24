import { UpdateNoteData } from "@/composables/React.types";
import moment from "moment";
import ElementMaker from "@/components/ui/ElementMarker";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import TextareaMaker from "../ui/TextareaMarker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimeMaker from "../ui/TimeMaker";
import { ListContext } from "@/contexts/api-get/ListContext";
import { updateNote } from "@/api/post/Notes/updateNote";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

export const UpdateNote = (props: UpdateNoteData) => {
  //   const queryClient = useQueryClient()
  const { list } = useContext(ListContext);
  const [title, setTitle] = useState({ title: props.title, show: false });
  const [description, setDescription] = useState({
    description: props.description,
    show: false,
  });
  const [date, setDate] = useState<Date | null>(new Date(props.date)); // Use Date type for date state
  const [time, setTime] = useState({
    time: moment(props.time).format("HH:mm"),
    show: false,
  });
  const [piority, setPiority] = useState({ piority: props.piority });
  const [listId, setlistId] = useState({ listId: props.list.id, show: false });
  const [formData, setFormData] = useState({
    title: props.title,
    description: props.description,
    date: props.date,
    time: moment(props.time).format("HH:mm"),
    piority: props.piority,
    listId: props.list.id,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle({ ...title, title: value });
    } else if (name === "description") {
      setDescription({ ...description, description: value });
    } else if (name === "time") {
      setTime({ ...time, time: value });
    } else if (name === "piority") {
      setPiority({ ...piority, piority: parseInt(value) });
    } else if (name === "listId") {
      setlistId({ ...listId, listId: value });
    }
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleDateChange = (selectedDate: Date | null) => {
    const selectDate = moment(selectedDate).format("YYYY-MM-DD");
    setDate(selectedDate);
    setFormData((prevFormData) => ({ ...prevFormData, date: selectDate }));
  };
  //   const mutation = useMutation({
  //     mutationFn: async (formatDate: string) => {
  //     await queryDate(userId, formatDate);
  //     },
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["changeNote"] });
  //     },
  //     onError: () => {
  //       console.log("error");
  //     },
  //   });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateNote(formData, props.id);
    props.handleClose({});
  };

  return (
    <div className="bg-primary p-10 w-full rounded-xl flex flex-col gap-4 m-h-[500px] text-secondary">
      <form onSubmit={handleSubmit} className="space-y-5">
        <h3 className="font-semibold text-[40px] flex gap-3">
          <div>Title :</div>
          <ElementMaker
            name="title"
            className={`text-[40px] h-[20px] mb-[-10px] min-w-[300px]`}
            value={title.title}
            handleChange={handleChange}
            handleDoubleClick={() => {
              setTitle({ ...title, show: true });
            }}
            handleBlur={() => setTitle({ ...title, show: false })}
            showInputEle={title.show}
          />
        </h3>
        <p className="flex flex-col text-xl h-[200px] font-bold gap-2">
          Description :
          <TextareaMaker
            name="description"
            className={`text-xl font-normal h-[150px] min-w-[550px] p-3`}
            value={description.description}
            handleChange={handleChange}
            handleDoubleClick={() => {
              setDescription({ ...description, show: true });
            }}
            handleBlur={() => {
              setDescription({ ...description, show: false });
            }}
            showInputEle={description.show}
          />
        </p>
        <p className="flex text-xl gap-2">
          List :
          <select
            onChange={handleChange}
            name="listId"
            id=""
            className="border-none bg-primary focus:bg-white"
          >
            <option value={props.list.id}>{props.list.namelist}</option>
            {list?.map((item) => {
              if (item.id != props.list.id)
                return (
                  <option value={item.id} key={item.id}>
                    {item.namelist}
                  </option>
                );
            })}
          </select>
        </p>
        <p className="flex text-xl gap-2 items-center">
          Date :
          <DatePicker
            selected={date}
            className="bg-primary text-[20px] border-none focus:bg-white active:border-blue-600"
            onChange={handleDateChange}
          />
        </p>
        <p className="flex text-xl gap-5 items-center">
          Time :
          <TimeMaker
            name="time"
            className={`text-[20px] h-[20px] mb-[-10px] min-w-[300px]`}
            value={time.time}
            handleChange={handleChange}
            handleDoubleClick={() => {
              setTime({ ...time, show: true });
            }}
            handleBlur={() => setTime({ ...time, show: false })}
            showInputEle={time.show}
          />
        </p>
        <p className="flex text-xl gap-5 items-center">
          Piority :
          <select
            defaultValue={props.piority}
            onChange={handleChange}
            name="piority"
            id=""
            className="border-none bg-primary focus:bg-white"
          >
            {["1", "2", "3"].map((piority) => {
              // if (piority != props.piority)
              return (
                <option value={parseInt(piority)} key={piority}>
                  {piority}
                </option>
              );
            })}
          </select>
        </p>
        <div className="flex justify-between items-center px-10">
          <div className="modal-action">
            <form method="dialog">
              <Button
                onClick={() => props.handleClose({})}
                className="btn w-[120px] h-12 text-lg font-bold"
              >
                Close
              </Button>
            </form>
          </div>
          <Button
            type="submit"
            className="btn mt-6 h-12 w-[120px] text-lg font-bold"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
