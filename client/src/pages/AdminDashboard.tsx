import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Plus, Trash2, Edit2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

import img1 from "@assets/stock_images/modern_minimalist_br_9d4fdd06.jpg";
import img2 from "@assets/stock_images/futuristic_mobile_ap_be3cc9dc.jpg";

export default function AdminDashboard() {
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const [projects, setProjects] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCredDialogOpen, setIsCredDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "Branding",
    description: "",
    client: "",
    year: new Date().getFullYear().toString(),
    services: "",
    image: ""
  });

  const [credData, setCredData] = useState({
    newUsername: localStorage.getItem("adminUser") || "alifarooqi24",
    newPassword: localStorage.getItem("adminPass") || "alifarooqi2009"
  });

  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const firebaseProjects = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(firebaseProjects);
    } catch (error) {
      console.error("Error fetching from Firebase:", error);
      setProjects([]);
    }
  };

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      setLocation("/admin");
      return;
    }
    fetchProjects();
  }, [setLocation]);

  const resetForm = () => {
    setFormData({
      title: "",
      category: "Branding",
      description: "",
      client: "",
      year: new Date().getFullYear().toString(),
      services: "",
      image: ""
    });
    setImagePreview(null);
    setEditingId(null);
  };

  const handleImageUrlChange = (url: string) => {
    setFormData(prev => ({ ...prev, image: url }));
    setImagePreview(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.description || !formData.client || !formData.services) {
      toast({ variant: "destructive", title: "Error", description: "Please fill all required fields" });
      return;
    }

    const projectData = {
      title: formData.title,
      category: formData.category,
      description: formData.description,
      client: formData.client,
      year: formData.year,
      services: formData.services.split(',').map(s => s.trim()),
      image: formData.image || img1,
      updatedAt: new Date().toISOString()
    };

    // Save to Firebase (fire and forget)
    if (editingId) {
      updateDoc(doc(db, "projects", String(editingId)), projectData).catch(err => console.error("Update failed:", err));
      const updated = projects.map(p => p.id === editingId ? { ...p, ...projectData } : p);
      setProjects(updated);
    } else {
      addDoc(collection(db, "projects"), { ...projectData, createdAt: new Date().toISOString() }).then(docRef => {
        setProjects([...projects, { id: docRef.id, ...projectData }]);
      }).catch(err => console.error("Create failed:", err));
    }

    toast({ title: "Success", description: editingId ? "Project updated!" : "Project created!" });
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (project: any) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      client: project.client || "",
      year: project.year || new Date().getFullYear().toString(),
      services: Array.isArray(project.services) ? project.services.join(", ") : (project.services || ""),
      image: project.image
    });
    setImagePreview(project.image);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    // Remove from local state immediately
    setProjects(prev => prev.filter(p => p.id !== id));
    toast({ title: "Success", description: "Project deleted!" });

    // Delete from Firebase (fire and forget)
    deleteDoc(doc(db, "projects", String(id))).catch(err => console.error("Delete failed:", err));
  };

  const handleChangeCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("adminUser", credData.newUsername);
    localStorage.setItem("adminPass", credData.newPassword);
    toast({ title: "Success", description: "Credentials updated successfully!" });
    setIsCredDialogOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setLocation("/admin");
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
          <h1 className="text-3xl font-bold font-heading text-white">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            {/* Change Credentials Modal */}
            {isCredDialogOpen && (
              <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-primary/20 shadow-2xl rounded-sm p-6 max-w-md w-full text-white">
                  <h2 className="text-xl font-bold mb-4 font-heading">Change Admin Credentials</h2>
                  <form onSubmit={handleChangeCredentials} className="space-y-4">
                    <div>
                      <label className="text-sm font-ui block mb-2">New Username</label>
                      <input
                        type="text"
                        value={credData.newUsername}
                        onChange={(e) => setCredData({...credData, newUsername: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-ui block mb-2">New Password</label>
                      <input
                        type="password"
                        value={credData.newPassword}
                        onChange={(e) => setCredData({...credData, newPassword: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1 bg-primary text-black hover:bg-white font-bold">
                        Update
                      </Button>
                      <Button type="button" onClick={() => setIsCredDialogOpen(false)} className="flex-1 bg-white/10 text-white hover:bg-white/20">
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Add/Edit Project Modal */}
            {isDialogOpen && (
              <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] border border-primary/20 shadow-2xl rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto text-white p-6">
                  <h2 className="text-2xl font-bold mb-6 font-heading">{editingId ? "Edit Project" : "Add New Project"}</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div>
                      <label className="text-sm font-ui block mb-2">Project Title *</label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder-gray-500"
                        placeholder="Enter project title"
                      />
                    </div>

                    {/* Category & Year */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-ui block mb-2">Category *</label>
                        <select
                          required
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
                        >
                          <option value="Branding">Branding</option>
                          <option value="UI/UX">UI/UX</option>
                          <option value="Print">Print</option>
                          <option value="Web Design">Web Design</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-ui block mb-2">Year</label>
                        <input
                          type="text"
                          value={formData.year}
                          onChange={(e) => setFormData({...formData, year: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
                        />
                      </div>
                    </div>

                    {/* Client */}
                    <div>
                      <label className="text-sm font-ui block mb-2">Client Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.client}
                        onChange={(e) => setFormData({...formData, client: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder-gray-500"
                        placeholder="Enter client name"
                      />
                    </div>

                    {/* Services */}
                    <div>
                      <label className="text-sm font-ui block mb-2">Services (comma separated) *</label>
                      <input
                        type="text"
                        required
                        value={formData.services}
                        onChange={(e) => setFormData({...formData, services: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder-gray-500"
                        placeholder="e.g. Branding, Web Design"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="text-sm font-ui block mb-2">Description *</label>
                      <textarea
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder-gray-500 h-24 resize-none"
                        placeholder="Enter project description"
                      />
                    </div>

                    {/* Image URL Input */}
                    <div className="space-y-2">
                      <label className="text-sm font-ui block mb-2">Project Cover Image URL</label>
                      <div className="flex gap-4 items-start">
                        <div className="flex-1">
                          <input
                            type="url"
                            value={formData.image}
                            onChange={(e) => handleImageUrlChange(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder-gray-500"
                            placeholder="e.g. https://example.com/image.jpg"
                          />
                          <p className="text-xs text-gray-500 mt-1">Paste image URL and preview appears →</p>
                        </div>
                        {imagePreview && (
                          <div className="w-20 h-20 rounded overflow-hidden border border-primary/30 shrink-0 shadow-lg">
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" onError={() => setImagePreview(null)} />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2 pt-4">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        data-testid="button-submit-project"
                        className="flex-1 bg-primary text-black hover:bg-white font-bold disabled:opacity-50"
                      >
                        {isLoading ? "Saving..." : (editingId ? "Update Project" : "Create Project")}
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          setIsDialogOpen(false);
                          resetForm();
                        }}
                        className="flex-1 bg-white/10 text-white hover:bg-white/20"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Top Buttons */}
            <Button
              onClick={() => {
                resetForm();
                setIsDialogOpen(true);
              }}
              data-testid="button-add-project"
              className="bg-primary text-black hover:bg-white font-bold font-ui flex gap-2"
            >
              <Plus size={16} /> Add Project
            </Button>

            <Button
              onClick={() => setIsCredDialogOpen(true)}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Change Credentials
            </Button>

            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 flex gap-2"
            >
              <LogOut size={16} /> Logout
            </Button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-card border border-white/10 rounded-sm overflow-hidden group">
              <div className="aspect-video relative bg-muted/20">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 text-xs rounded text-white font-ui">
                  {project.category}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-white font-heading mb-2">{project.title}</h3>
                <p className="text-sm text-gray-400 font-body mb-4 line-clamp-2">{project.description}</p>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(project)}
                    data-testid={`button-edit-${project.id}`}
                    className="flex-1 border-white/20 text-white hover:bg-white/10"
                  >
                    <Edit2 size={14} className="mr-2" /> Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(project.id)}
                    data-testid={`button-delete-${project.id}`}
                    className="bg-red-500/20 text-red-500 hover:bg-red-500/40 border border-red-500/50"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
