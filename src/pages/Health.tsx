
import { useState } from "react";
import { Activity, Calendar, Pill, Weight, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppointmentCard from "@/components/ui/AppointmentCard";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddMedicationModal from "@/components/health/AddMedicationModal";
import AddVaccineModal from "@/components/health/AddVaccineModal";
import AddAppointmentModal from "@/components/health/AddAppointmentModal";

// Use this for storing in-memory data
// In a real app, you'd fetch this from a database
const initialPets = [
  {
    id: 1,
    name: "Bella",
    type: "Dog",
    breed: "Golden Retriever",
    age: "3 years"
  },
  {
    id: 2,
    name: "Max",
    type: "Dog",
    breed: "Border Collie",
    age: "4 years"
  },
  {
    id: 3,
    name: "Oliver",
    type: "Cat",
    breed: "Maine Coon",
    age: "2 years"
  }
];

export default function Health() {
  // State for storing health data
  const [medications, setMedications] = useState<any[]>([]);
  const [vaccines, setVaccines] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [pets] = useState(initialPets);

  // State for modals
  const [medicationModalOpen, setMedicationModalOpen] = useState(false);
  const [vaccineModalOpen, setVaccineModalOpen] = useState(false);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);

  // Handlers for adding new items
  const handleAddMedication = (medication: any) => {
    setMedications([...medications, medication]);
  };

  const handleAddVaccine = (vaccine: any) => {
    setVaccines([...vaccines, vaccine]);
  };

  const handleAddAppointment = (appointment: any) => {
    setAppointments([...appointments, appointment]);
  };

  return (
    <div className="page-container page-transition">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Health & Wellness</h1>
        <p className="text-muted-foreground">
          Track medications, vaccinations, and appointments to keep your pets healthy.
        </p>
      </div>

      {/* Health overview statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Medications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold">{medications.length}</span>
              <span className="text-sm text-muted-foreground">medications</span>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Vaccines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold">{vaccines.length}</span>
              <span className="text-sm text-muted-foreground">up to date</span>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold">{appointments.length}</span>
              <span className="text-sm text-muted-foreground">scheduled</span>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Next Check-up</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold">
                {appointments.length > 0 ? appointments[0].date : "None"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health tabs */}
      <Tabs defaultValue="medications" className="mb-10">
        <TabsList className="mb-6">
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="vaccines">Vaccines</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="medications" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title">Current Medications</h2>
            <Button onClick={() => setMedicationModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Medication
            </Button>
          </div>
          
          {medications.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Pill className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <h3 className="text-lg font-medium text-gray-600 mb-1">No medications yet</h3>
              <p className="text-sm text-gray-500 mb-4">Add medications to track your pet's health</p>
              <Button onClick={() => setMedicationModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Medication
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 staggered-fade-in">
              {medications.map((med) => (
                <Card key={med.id} className="shadow-sm card-hover">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{med.name}</CardTitle>
                        <CardDescription>For {med.pet}</CardDescription>
                      </div>
                      <div className="rounded-full bg-petcare-teal/10 p-2">
                        <Pill className="h-4 w-4 text-petcare-teal" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Weight className="h-4 w-4 text-muted-foreground" />
                        <span>{med.dosage}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{med.frequency}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{med.time}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 pb-3">
                    <div className="w-full rounded-md bg-gray-50 p-2 text-center text-sm">
                      <span className="font-medium">Next dose: </span>
                      <span>{med.nextDose}</span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="vaccines" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title">Vaccination Records</h2>
            <Button onClick={() => setVaccineModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Vaccine
            </Button>
          </div>
          
          {vaccines.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <div className="rounded-full bg-petcare-teal/10 p-3 inline-block mx-auto mb-2">
                <Activity className="h-8 w-8 text-petcare-teal" />
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-1">No vaccination records yet</h3>
              <p className="text-sm text-gray-500 mb-4">Add vaccination records to track your pet's health</p>
              <Button onClick={() => setVaccineModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Vaccine Record
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border shadow">
              <table className="w-full min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vaccine</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Given</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Due</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {vaccines.map((vaccine) => (
                    <tr key={vaccine.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{vaccine.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vaccine.pet}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vaccine.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vaccine.nextDue}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vaccine.provider}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="appointments" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title">Upcoming Appointments</h2>
            <Button onClick={() => setAppointmentModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Book Appointment
            </Button>
          </div>
          
          {appointments.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <div className="rounded-full bg-petcare-blue/10 p-3 inline-block mx-auto mb-2">
                <Calendar className="h-8 w-8 text-petcare-blue" />
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-1">No appointments scheduled</h3>
              <p className="text-sm text-gray-500 mb-4">Book appointments to manage your pet's care</p>
              <Button onClick={() => setAppointmentModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Book Appointment
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 staggered-fade-in">
              {appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  title={appointment.title}
                  date={appointment.date}
                  time={appointment.time}
                  provider={appointment.provider}
                  address={appointment.address}
                  status={appointment.status}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Health metrics tracking (simplified) */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="section-title">Health Tracking</h2>
          <Button variant="outline">View All Metrics</Button>
        </div>
        
        <div className="bg-petcare-blue/5 rounded-2xl p-6 md:p-8">
          <div className="text-center mb-6">
            <h3 className="text-lg font-medium mb-2">Track your pet's health metrics</h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Monitor weight, activity levels, food intake, and more to ensure your pet stays healthy and happy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="mx-auto h-10 w-10 flex items-center justify-center rounded-full bg-petcare-teal/10 mb-2">
                <Weight className="h-5 w-5 text-petcare-teal" />
              </div>
              <h3 className="font-medium text-sm">Weight</h3>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="mx-auto h-10 w-10 flex items-center justify-center rounded-full bg-petcare-coral/10 mb-2">
                <Activity className="h-5 w-5 text-petcare-coral" />
              </div>
              <h3 className="font-medium text-sm">Activity</h3>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="mx-auto h-10 w-10 flex items-center justify-center rounded-full bg-petcare-blue/10 mb-2">
                <div className="h-5 w-5 text-petcare-blue flex items-center justify-center">
                  🍕
                </div>
              </div>
              <h3 className="font-medium text-sm">Food</h3>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="mx-auto h-10 w-10 flex items-center justify-center rounded-full bg-petcare-sage/10 mb-2">
                <div className="h-5 w-5 text-petcare-sage flex items-center justify-center">
                  💧
                </div>
              </div>
              <h3 className="font-medium text-sm">Water</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <AddMedicationModal
        open={medicationModalOpen}
        onOpenChange={setMedicationModalOpen}
        onMedicationAdded={handleAddMedication}
        pets={pets}
      />

      <AddVaccineModal
        open={vaccineModalOpen}
        onOpenChange={setVaccineModalOpen}
        onVaccineAdded={handleAddVaccine}
        pets={pets}
      />

      <AddAppointmentModal
        open={appointmentModalOpen}
        onOpenChange={setAppointmentModalOpen}
        onAppointmentAdded={handleAddAppointment}
      />
    </div>
  );
}
