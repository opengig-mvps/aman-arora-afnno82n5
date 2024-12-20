"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LoaderCircleIcon, Trash } from "lucide-react";

type Bindle = {
  id: number;
  name: string;
  syncStatus: string;
  lastSyncTime: string;
};

const BindlesPage = () => {
  const { data: session } = useSession();
  const [bindles, setBindles] = useState<Bindle[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [syncing, setSyncing] = useState<boolean>(false);

  const fetchBindles = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/users/${session?.user?.id}/bindles`);
      setBindles(res?.data?.data);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const syncBindle = async (bindleId: number) => {
    try {
      setSyncing(true);
      const res = await api.post(`/api/bindles/${bindleId}/sync`);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        fetchBindles();
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Sync failed");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    } finally {
      setSyncing(false);
    }
  };

  const deleteBindle = async (bindleId: number) => {
    try {
      const res = await api.delete(`/api/bindles/${bindleId}`);
      if (res?.data?.success) {
        toast.success("Bindle deleted successfully");
        fetchBindles();
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Deletion failed");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    if (session) {
      fetchBindles();
    }
  }, [session]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Manage Your Bindles</h1>
      {loading ? (
        <LoaderCircleIcon className="animate-spin mx-auto" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bindles?.map((bindle) => (
            <Card key={bindle?.id}>
              <CardHeader>
                <CardTitle>{bindle?.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Sync Status: {bindle?.syncStatus}</p>
                <p className="text-sm">
                  Last Sync: {new Date(bindle?.lastSyncTime).toLocaleString()}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => syncBindle(bindle?.id)}
                  disabled={syncing}
                >
                  {syncing ? <LoaderCircleIcon className="animate-spin" /> : "Sync"}
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Bindle</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this bindle? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <Button variant="outline" onClick={() => deleteBindle(bindle?.id)}>
                        Delete
                      </Button>
                      <AlertDialogAction>Cancel</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BindlesPage;