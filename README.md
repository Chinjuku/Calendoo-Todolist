# Calendoo-Todolist

## This project about Notes and Project task (Kanban) ##

### 1. Notes have:
- Sticky Notes
    - สร้างโน้ตแปะไว้เตือนความจำ
    - ในโน้ตมี
        - ชื่อหัวเรื่อง Title
        - คำอธิบาย Description
        - วัน Date
        - เวลา Time (ตั้งเเต่กี่โมงถึงกี่โมง : start - end)
        - ความสำคัญ Priority
        - List เลือกรายการที่สร้างไว้เพื่อแยกประเภทโน๊ตได้
    - สามารถ สร้าง / ลบ / แก้ไขโน๊ตได้
    - สามารถ ดูวันที่ของโน๊ต Filter & Paginate
    - ทุกอย่าง Realtime หมด
- See notes in Calendar
    - ดูโน๊ตตามปฎิทิน Calendar โดยจะสามารถดูโน๊ตได้ดังนี้ :
        - รายวัน -> เวลา 24 ชม
        - รายอาทิตย์ -> เวลา 24 ขม & 7 วัน
        - รายเดือน -> 30-31 วัน & 1เดือนที่เลือกไว้
        - Agenda -> ดูรายการโน้ตทั้งหมด / เวลา / รายวัน / รายเดือน เเละ ปี 

### 2. Projects (Kanban) have:
- Projects
    - สร้าง Project (Kanban) (1 project มีหลาย board)
    - สร้าง Project ดังนี้ 
        - ชื่อ project
        - สี project
- Boards
    - สร้าง Board ใน Project (1 board มีหลาย task)
    - สร้าง Board ดังนี้
        - ชื่อ board
        - สี board
        - ติดดาว (Favorite)
- Task
    - สร้าง Task ใน Board (1 Task มีหลาย tasklist)
    - สร้าง Task ดังนี้
        - ชื่อ Task
- TaskList (รายการย่อยๆใน Task)
    - สร้าง Tasklist ใน Task (มีมากสุด) 
    - สามารถย้าย Tasklist วาง ใน Task อื่นๆได้ (เฟี้ยว!!)
    - สร้าง Tasklist ได้ดังนี้
        - ชื่อหัวเรื่อง Title
        - คำอธิบาย Description
        - วันที่ Dateline Date
        - วันและเวลาที่สร้าง TimeStamp
        - ความสำคัญ Priority

- See task lists in Calendar
    - ดูรายการของ Task ทั้งหมดตามโดยใช้สีในการแยกแต่ละ Board ปฎิทิน Calendar โดยจะสามารถดูรายการ Task ต่างๆได้ดังนี้ :
        - รายวัน -> เวลา 24 ชม (All day)
        - รายอาทิตย์ -> เวลา 24 ขม & 7 วัน
        - รายเดือน -> 30-31 วัน & 1เดือนที่เลือกไว้
        - Agenda -> ดูรายการโน้ตทั้งหมด / เวลา / รายวัน / รายเดือน เเละ ปี 

## Tools (MERN Stack)  ##
- (M) Mongo DB -> <u>Database</u>
- (E) Express.js -> Backend สำหรับสร้าง API
- (R) React + Vite Typescript -> <u>Frontend</u> Library
- (N) Node.js Typescript -> <u>Backend Web</u> server
- Prisma -> Help to create Database easier (Model)
- Tailwind CSS -> CSS Framework
- Shadcn -> React UI Framework
- DaisyUI & Flowbite React -> Tailwind Plugin
- TanStack Query -> Make Real time query data from Backend o Frontend
- Zod -> ทำ Validation Form ได้ง่ายขึ้น
- JWT -> JSON Web Token (สร้าง token สำหรับ Login เพิ่มความปลอดภัยมากขึ้น)

