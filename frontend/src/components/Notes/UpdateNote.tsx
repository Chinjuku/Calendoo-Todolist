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
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface FormData {
  title: string
  description: string
  date: string
  starttime: string
  endtime: string
  piority: number
  listId: string
}

export const UpdateNote = (props: UpdateNoteData) => {
  const { list } = useContext(ListContext);
  const [title, setTitle] = useState({ title: props.title, show: false });
  const [description, setDescription] = useState({
    description: props.description,
    show: false,
  });
  const [date, setDate] = useState<Date | null>(new Date(props.date)); // Use Date type for date state
  const [starttime, setStartTime] = useState({
    starttime: moment(props.starttime).format("HH:mm"),
    show: false,
  });
  const [endtime, setEndTime] = useState({
    endtime: moment(props.endtime).format("HH:mm"),
    show: false,
  });
  const [piority, setPiority] = useState({ piority: props.piority });
  const [listId, setlistId] = useState({ listId: props.list.id, show: false });
  const [error, setError] = useState({
    description: "",
    time: ""
  })
  const [formData, setFormData] = useState({
    title: props.title,
    description: props.description,
    date: props.date,
    starttime: moment(props.starttime).format("HH:mm"),
    endtime: moment(props.endtime).format("HH:mm"),
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
    } else if (name === "starttime") {
      setStartTime({ ...starttime, starttime: value });
    } else if (name === "endtime") {
      setEndTime({ ...endtime, endtime: value });
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
  const queryClient = useQueryClient()
  const { mutate } = useMutation({ mutationFn : (formData: FormData) => updateNote(formData, props.id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["allnote"] })
      await queryClient.invalidateQueries({ queryKey: ["changeNote"] })
      await queryClient.invalidateQueries({ queryKey: ["dates"] })
      await queryClient.invalidateQueries({ queryKey: ["allnotes"] })
      await queryClient.invalidateQueries({ queryKey: ["today"] })
      await queryClient.invalidateQueries({ queryKey: ["noteperList"] })
      await queryClient.invalidateQueries({ queryKey: ["showallnote"] })
      props.handleClose({});
    },
    onError: () => {
      console.log("error");
    }
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const startMoment = moment(formData.starttime, "HH:mm");
    const endMoment = moment(formData.endtime, "HH:mm");
    const errors = {
      description : "",
      time : ""
    };

    if (formData.description.length < 10) {
      errors.description = "Description must be at least 10 characters.";
    }

    if (startMoment.isAfter(endMoment)) {
      errors.time = "Start time cannot be after end time";
    }

    if (errors.time.length > 0 || errors.description.length > 0) {
      setError(errors);
      return;
    }

    setError(errors);
    mutate(formData)
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
        <span className="text-red-600">{error.description !== "" && error.description}</span>
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
            name="starttime"
            className={`text-[20px] h-[20px] mb-[-10px] min-w-[300px]`}
            value={starttime.starttime}
            handleChange={handleChange}
            handleDoubleClick={() => {
              setStartTime({ ...starttime, show: true });
            }}
            handleBlur={() => setStartTime({ ...starttime, show: false })}
            showInputEle={starttime.show}
          />
          <p>-</p>
          <TimeMaker
            name="endtime"
            className={`text-[20px] h-[20px] mb-[-10px] min-w-[300px]`}
            value={endtime.endtime}
            handleChange={handleChange}
            handleDoubleClick={() => {
              setEndTime({ ...endtime, show: true });
            }}
            handleBlur={() => setEndTime({ ...endtime, show: false })}
            showInputEle={endtime.show}
          />
        </p>
        <span className="text-red-600">{error.time !== "" && error.time}</span>
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
