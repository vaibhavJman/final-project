import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Sidebar from "@/components/Sidebar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Trainers = () => {
  const [activeNav, setActiveNav] = useState("trainers");
  const [open, setOpen] = useState(false);
  const [editTrainerIndex, setEditTrainerIndex] = useState(null);

  const [newTrainer, setNewTrainer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    expertise: "",
    trainingName: "",
  });

  const [trainers, setTrainers] = useState([]);
  const [filter, setFilter] = useState("all"); 
  useEffect(() => {
    fetch("http://localhost:5000/api/admin/trainers")
      .then((response) => response.json())
      .then((data) => setTrainers(data));
  }, []);

  const trainings = [
    "Data Engineering",
    "Full Stack Basics",
    "Leadership Training",
    "Machine Learning Advanced",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrainer({ ...newTrainer, [name]: value });
  };

  const handleAddTrainer = () => {
    const fullName = `${newTrainer.firstName} ${newTrainer.lastName}`;
    const id = trainers.length + 1;

    const newEntry = {
      id,
      fullName,
      email: newTrainer.email,
      expertise: newTrainer.expertise,
      trainingName: newTrainer.trainingName,
    };

    if (editTrainerIndex !== null) {
      const updatedTrainers = [...trainers];
      updatedTrainers[editTrainerIndex] = newEntry;
      setTrainers(updatedTrainers);
    } else {
      setTrainers([...trainers, newEntry]);
    }

    setOpen(false);
    setEditTrainerIndex(null);
    setNewTrainer({
      firstName: "",
      lastName: "",
      email: "",
      expertise: "",
      trainingName: "",
    });
  };

  const handleOpenAddTrainer = () => {
    setNewTrainer({
      firstName: "",
      lastName: "",
      email: "",
      expertise: "",
      trainingName: "",
    });
    setEditTrainerIndex(null);
    setOpen(true);
  };

  const handleEditTrainer = (index) => {
    const trainer = trainers[index];
    const [firstName, lastName] = trainer.fullName.split(" ");
    setNewTrainer({
      firstName,
      lastName,
      email: trainer.email,
      expertise: trainer.expertise,
      trainingName: trainer.trainingName,
    });
    setEditTrainerIndex(index);
    setOpen(true);
  };

  const handleDeleteTrainer = (index) => {
    const updatedTrainers = trainers.filter((_, i) => i !== index);
    setTrainers(updatedTrainers);
  };

  const filteredTrainers = trainers.filter((trainer) => {
    if (filter === "assigned") {
      return trainer.trainingsAssignedtoTrainers.length > 0;
    }
    if (filter === "notAssigned") {
      return trainer.trainingsAssignedtoTrainers.length === 0;
    }
    return true;
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

      <div className="flex-grow p-6">
        <Card>
          <CardHeader className="flex justify-between items-start">
            <div>
              <CardTitle>Trainers List</CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                Below is a list of trainers and assigned trainings.
              </p>
            </div>
            {/* Add New Trainer Button */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="sm" onClick={handleOpenAddTrainer}>
                  Add New Trainer
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>
                  {editTrainerIndex !== null
                    ? "Edit Trainer"
                    : "Add New Trainer"}
                </DialogTitle>
                <DialogDescription>
                  Please fill in the details to{" "}
                  {editTrainerIndex !== null ? "edit" : "add"} the trainer.
                </DialogDescription>
                <div className="space-y-4">
                  {/* Input Fields */}
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={newTrainer.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={newTrainer.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      value={newTrainer.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="expertise">Expertise</Label>
                    <Input
                      id="expertise"
                      name="expertise"
                      value={newTrainer.expertise}
                      onChange={handleInputChange}
                      placeholder="Expertise"
                    />
                  </div>
                  <div>
                    <Label htmlFor="trainingName">Training Name</Label>
                    <Select
                      name="trainingName"
                      onValueChange={(value) =>
                        setNewTrainer({ ...newTrainer, trainingName: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a training" />
                      </SelectTrigger>
                      <SelectContent>
                        {trainings.map((training, index) => (
                          <SelectItem key={index} value={training}>
                            {training}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddTrainer}>
                    {editTrainerIndex !== null ? "Save Changes" : "Add Trainer"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>

          {/* Filter Trainers */}
          <div className="flex justify-end mb-4 w-52 ml-6">
            <Select onValueChange={(value) => setFilter(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter trainers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Trainers</SelectItem>
                <SelectItem value="assigned">With Assigned Training</SelectItem>
                <SelectItem value="notAssigned">
                  Without Assigned Training
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold text-center">
                    Trainer ID
                  </TableHead>
                  <TableHead className="font-bold text-center">Name</TableHead>
                  <TableHead className="font-bold text-center">Email</TableHead>
                  <TableHead className="font-bold text-center">
                    Training Name
                  </TableHead>
                  <TableHead className="font-bold text-center">
                    Domain Name
                  </TableHead>
                  <TableHead className="font-bold text-center">
                    No. of Employee Assigned
                  </TableHead>
                  <TableHead className="font-bold text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTrainers.map((trainer, index) => (
                  <TableRow key={trainer.id} className="h-[6vh]">
                    <TableCell className="font-medium text-center px-6 py-3 min-w-[120px]">
                      {trainer.id}
                    </TableCell>
                    <TableCell className="font-medium text-center px-6 py-3 min-w-[150px]">
                      {trainer.firstName} {trainer.lastName}
                    </TableCell>
                    <TableCell className="text-center px-6 py-3 min-w-[150px]">
                      {trainer.email}
                    </TableCell>
                    <TableCell className="text-center px-6 py-3 min-w-[150px]">
                      {Array.isArray(trainer.trainingsAssignedtoTrainers) &&
                      trainer.trainingsAssignedtoTrainers.length > 0
                        ? trainer.trainingsAssignedtoTrainers
                            .map((item) => item.name)
                            .join(", ")
                        : "-"}
                    </TableCell>
                    <TableCell className="text-center px-6 py-3 min-w-[150px]">
                      {Array.isArray(trainer.trainingsAssignedtoTrainers) &&
                      trainer.trainingsAssignedtoTrainers.length > 0
                        ? trainer.trainingsAssignedtoTrainers.map((item) =>
                            item.domain.name.replace("_", " ")
                          )
                        : "-"}
                    </TableCell>
                    <TableCell className="text-center px-6 py-3 min-w-[150px]">
                      {trainer.trainingsAssignedtoTrainers.length > 0
                        ? trainer.trainingsAssignedtoTrainers.map(
                            (item) => item.assignedEmployees.length
                          )
                        : "-"}
                    </TableCell>
                    <TableCell className="text-center px-6 py-3">
                      <Button
                        size="sm"
                        className="mr-2"
                        onClick={() => handleEditTrainer(index)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteTrainer(index)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Trainers;
