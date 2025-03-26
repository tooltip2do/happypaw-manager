
import { useState } from "react";
import { User, Bell, Shield, CreditCard, LifeBuoy, Mail, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <div className="page-container page-transition">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account, notifications, and preferences.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar navigation */}
        <div className="w-full md:w-64 space-y-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="p-4 border-b">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-petcare-blue/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-petcare-blue" />
                </div>
                <div>
                  <h3 className="font-medium">Jane Smith</h3>
                  <p className="text-xs text-muted-foreground">jane.smith@example.com</p>
                </div>
              </div>
            </div>
            <nav className="p-2">
              <a href="#account" className="flex items-center space-x-2 px-3 py-2 rounded-md bg-primary/10 text-primary">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">Account</span>
              </a>
              <a href="#notifications" className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                <Bell className="h-4 w-4" />
                <span className="text-sm font-medium">Notifications</span>
              </a>
              <a href="#privacy" className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                <Shield className="h-4 w-4" />
                <span className="text-sm font-medium">Privacy</span>
              </a>
              <a href="#billing" className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                <CreditCard className="h-4 w-4" />
                <span className="text-sm font-medium">Billing</span>
              </a>
              <a href="#support" className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                <LifeBuoy className="h-4 w-4" />
                <span className="text-sm font-medium">Support</span>
              </a>
              <Separator className="my-2" />
              <a href="#" className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                <LogOut className="h-4 w-4" />
                <span className="text-sm font-medium">Log out</span>
              </a>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <Card className="shadow-sm mb-6" id="account">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Update your personal details and email preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" defaultValue="Jane" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" defaultValue="Smith" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" defaultValue="jane.smith@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input id="phone" type="tel" defaultValue="(555) 123-4567" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card className="shadow-sm mb-6" id="notifications">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how you receive notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive email updates about your account activity
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">Appointment Reminders</h4>
                    <p className="text-sm text-muted-foreground">
                      Get notified about upcoming appointments
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">Medication Reminders</h4>
                    <p className="text-sm text-muted-foreground">
                      Get reminded when it's time to give medication
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">Marketing Communications</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about new products and features
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>

          <Card className="shadow-sm mb-6" id="privacy">
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Control your data and privacy preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">Profile Visibility</h4>
                    <p className="text-sm text-muted-foreground">
                      Allow other pet owners to see your profile
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">Location Sharing</h4>
                    <p className="text-sm text-muted-foreground">
                      Share your location to find nearby services
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">Data Analytics</h4>
                    <p className="text-sm text-muted-foreground">
                      Help us improve by sharing usage data
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-4">
              <Button>Save Privacy Settings</Button>
              <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                Delete Account
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
