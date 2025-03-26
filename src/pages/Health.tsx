
import { useState } from "react";
import { Activity, Calendar, Pill, Weight, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppointmentCard from "@/components/ui/AppointmentCard";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const medications = [
  {
    id: 1,
    name: "Heartgard Plus",
    dosage: "1 tablet",
    frequency: "Monthly",
    time: "With food",
    pet: "Bella",
    nextDose: "June 15, 2023"
  },
  {
    id: 2,
    name: "Joint Supplement",
    dosage: "1 tablet",
    frequency: "Daily",
    time: "Morning",
    pet: "Max",
    nextDose: "Today"
  },
  {
    id: 3,
    name: "Flea Treatment",
    dosage: "1 application",
    frequency: "Monthly",
    time: "Any time",
    pet: "Oliver",
    nextDose: "June 22, 2023"
  }
];

const vaccines = [
  {
    id: 1,
    name: "Rabies",
    pet: "Bella",
    date: "January 15, 2023",
    nextDue: "January 15, 2024",
    provider: "Dr. Sarah Wilson"
  },
  {
    id: 2,
    name: "DHPP",
    pet: "Max",
    date: "March 10, 2023",
    nextDue: "March 10, 2024",
    provider: "Dr. Sarah Wilson"
  },
  {
    id: 3,
    name: "Feline Distemper",
    pet: "Oliver",
    date: "February 5, 2023",
    nextDue: "February 5, 2024",
    provider: "Dr. Michael Chen"
  }
];

const appointments = [
  {
    id: 1,
    title: "Veterinary Check-up",
    date: "Tomorrow, June 15",
    time: "10:00 AM",
    provider: "Dr. Sarah Wilson",
    address: "123 Pet Health Clinic, New York",
    status: "upcoming" as const
  },
  {
    id: 2,
    title: "Grooming Session",
    date: "Saturday, June 18",
    time: "2:30 PM",
    provider: "PetSmart Grooming",
    address: "456 Mall Avenue, New York",
    status: "upcoming" as const
  },
  {
    id: 3,
    title: "Vaccination Appointment",
    date: "Monday, June 20",
    time: "11:15 AM",
    provider: "Dr. Michael Chen",
    address: "789 Animal Hospital, New York",
    status: "upcoming" as const
  }
];

export default function Health() {
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
              <span className="text-3xl font-bold">Tomorrow</span>
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
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Medication
            </Button>
          </div>
          
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
                    <span className={med.nextDose === "Today" ? "text-petcare-coral font-medium" : ""}>
                      {med.nextDose}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="vaccines" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title">Vaccination Records</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Vaccine
            </Button>
          </div>
          
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
        </TabsContent>
        
        <TabsContent value="appointments" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title">Upcoming Appointments</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Book Appointment
            </Button>
          </div>
          
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
            <div className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition-shadow">
              <div className="mx-auto h-10 w-10 flex items-center justify-center rounded-full bg-petcare-teal/10 mb-2">
                <Weight className="h-5 w-5 text-petcare-teal" />
              </div>
              <h3 className="font-medium text-sm">Weight</h3>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition-shadow">
              <div className="mx-auto h-10 w-10 flex items-center justify-center rounded-full bg-petcare-coral/10 mb-2">
                <Activity className="h-5 w-5 text-petcare-coral" />
              </div>
              <h3 className="font-medium text-sm">Activity</h3>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition-shadow">
              <div className="mx-auto h-10 w-10 flex items-center justify-center rounded-full bg-petcare-blue/10 mb-2">
                <div className="h-5 w-5 text-petcare-blue flex items-center justify-center">
                  🍕
                </div>
              </div>
              <h3 className="font-medium text-sm">Food</h3>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition-shadow">
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
    </div>
  );
}
