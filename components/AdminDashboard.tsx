import React, { useState } from 'react';
import { BlogPost, NotificationItem, ResourceItem, InquiryItem } from '../types';
import { Plus, Trash2, Save, LayoutDashboard, Bell, FileText, Download, ArrowLeft, UploadCloud, Pencil, XCircle, Loader2, LogOut, User, Image as ImageIcon, MessageSquare, Phone, Calendar } from 'lucide-react';
import { BlogService, NotificationService, ResourceService, InquiryService } from '../services/api';
import { StorageService } from '../services/storage';

interface AdminDashboardProps {
  onBack: () => void;
  onLogout?: () => void;
  posts: BlogPost[];
  notifications: NotificationItem[];
  resources: ResourceItem[];
  inquiries: InquiryItem[];
  setPosts: (posts: BlogPost[]) => void;
  setNotifications: (notes: NotificationItem[]) => void;
  setResources: (res: ResourceItem[]) => void;
  setInquiries: (inq: InquiryItem[]) => void;
  currentUserEmail?: string | null;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  onBack, onLogout, posts, notifications, resources, inquiries, setPosts, setNotifications, setResources, setInquiries, currentUserEmail 
}) => {
  const [activeTab, setActiveTab] = useState<'blogs' | 'notifications' | 'downloads' | 'inquiries'>('blogs');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // --- Blog State ---
  const initialBlogForm: Partial<BlogPost> = { title: '', content: '', excerpt: '', category: 'General', author: 'Bhagwan Pandekar', imageUrl: '' };
  const [blogForm, setBlogForm] = useState<Partial<BlogPost>>(initialBlogForm);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [selectedBlogImage, setSelectedBlogImage] = useState<File | null>(null);
  
  // --- Notification State ---
  const initialNoteForm: Partial<NotificationItem> = { title: '', message: '', type: 'info', active: true, link: '' };
  const [noteForm, setNoteForm] = useState<Partial<NotificationItem>>(initialNoteForm);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  // --- Resource State ---
  const initialResForm: Partial<ResourceItem> = { title: '', description: '', fileType: 'pdf' };
  const [resForm, setResForm] = useState<Partial<ResourceItem>>(initialResForm);
  const [editingResId, setEditingResId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');


  // --- HELPERS ---
  const refreshAllData = async () => {
    // Re-fetch data to ensure UI matches Database exactly
    const [fetchedBlogs, fetchedNotes, fetchedRes, fetchedInquiries] = await Promise.all([
      BlogService.getAll(),
      NotificationService.getAll(),
      ResourceService.getAll(),
      InquiryService.getAll()
    ]);
    setPosts(fetchedBlogs);
    setNotifications(fetchedNotes);
    setResources(fetchedRes);
    setInquiries(fetchedInquiries);
  };


  // --- BLOG HANDLERS ---
  const handleBlogImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedBlogImage(file);
    }
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.content) return;
    
    setIsSubmitting(true);
    try {
      let finalImageUrl = blogForm.imageUrl || 'https://picsum.photos/800/600';

      // 1. Upload Image if selected
      if (selectedBlogImage) {
        finalImageUrl = await StorageService.uploadFile(selectedBlogImage, 'blogs');
      }

      if (editingPostId) {
        await BlogService.update(editingPostId, {
          ...blogForm,
          imageUrl: finalImageUrl
        });
      } else {
        const newPostData = {
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          title: blogForm.title!,
          content: blogForm.content!,
          excerpt: blogForm.excerpt || blogForm.content!.substring(0, 100) + '...',
          category: blogForm.category || 'General',
          author: blogForm.author || 'Admin',
          imageUrl: finalImageUrl
        };
        await BlogService.create(newPostData as any);
      }
      setBlogForm(initialBlogForm);
      setSelectedBlogImage(null);
      setEditingPostId(null);
      await refreshAllData(); // Sync with DB
    } catch (err) {
      alert("Error saving blog post. Check console.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const editPost = (e: React.MouseEvent, post: BlogPost) => {
    e.stopPropagation();
    if (post.id.startsWith('mock-')) {
        alert("This is a 'Mock' post. It does not exist in the database, so you cannot edit it. Please create a NEW post, and the mock data will disappear.");
        return;
    }
    setBlogForm(post);
    setSelectedBlogImage(null);
    setEditingPostId(post.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deletePost = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent clicks from bubbling
    e.preventDefault();

    if (id.startsWith('mock-')) {
        alert("This is a 'Mock' post. It will disappear automatically once you add your first real post.");
        return;
    }

    if(window.confirm('Are you sure you want to delete this post permanently?')) {
      setIsDeleting(id);
      try {
        await BlogService.delete(id);
        await refreshAllData(); // Force refresh from server to confirm delete
        
        if(editingPostId === id) {
          setEditingPostId(null);
          setBlogForm(initialBlogForm);
          setSelectedBlogImage(null);
        }
      } catch (err: any) {
        console.error("Delete Error:", err);
        let msg = "Failed to delete post.";
        if (err.message && err.message.includes('Missing or insufficient permissions')) {
            msg += "\n\nCRITICAL: Firestore Security Rules block this action. Ensure your account is authorized.";
        } else {
            msg += "\nError: " + err.message;
        }
        alert(msg);
      } finally {
        setIsDeleting(null);
      }
    }
  };


  // --- NOTIFICATION HANDLERS ---
  const handleNoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteForm.title || !noteForm.message) return;

    setIsSubmitting(true);
    try {
      if (editingNoteId) {
        await NotificationService.update(editingNoteId, noteForm);
      } else {
        const newNoteData = {
          date: new Date().toLocaleDateString(),
          title: noteForm.title!,
          message: noteForm.message!,
          type: noteForm.type as any || 'info',
          active: noteForm.active !== undefined ? noteForm.active : true,
          link: noteForm.link
        };
        await NotificationService.create(newNoteData as any);
      }
      setNoteForm(initialNoteForm);
      setEditingNoteId(null);
      await refreshAllData();
    } catch (err) {
      alert("Error saving notification.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const editNote = (e: React.MouseEvent, note: NotificationItem) => {
    e.stopPropagation();
    if (note.id.startsWith('mock-')) {
        alert("Mock notifications cannot be edited. Create a new one.");
        return;
    }
    setNoteForm(note);
    setEditingNoteId(note.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteNote = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (id.startsWith('mock-')) {
        alert("Mock notifications cannot be deleted. Create a new one to hide these.");
        return;
    }

    if(window.confirm('Remove this alert?')) {
      setIsDeleting(id);
      try {
        await NotificationService.delete(id);
        await refreshAllData();
        if(editingNoteId === id) {
          setEditingNoteId(null);
          setNoteForm(initialNoteForm);
        }
      } catch (err) {
        alert("Error deleting notification.");
      } finally {
        setIsDeleting(null);
      }
    }
  };


  // --- RESOURCE HANDLERS ---
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setSelectedFileName(file.name);
      
      // Auto-detect type
      let type: 'pdf' | 'ppt' | 'doc' = 'pdf';
      if (file.name.endsWith('.ppt') || file.name.endsWith('.pptx')) type = 'ppt';
      else if (file.name.endsWith('.doc') || file.name.endsWith('.docx')) type = 'doc';
      
      const title = file.name.split('.')[0].replace(/[-_]/g, ' ');
      
      setResForm(prev => ({
        ...prev,
        title: prev.title || title,
        fileType: type
      }));
    }
  };

  const handleResSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resForm.title) return;

    // Must have a file if creating new, or a URL if editing
    if (!editingResId && !selectedFile) {
        alert("Please upload a file.");
        return;
    }

    setIsSubmitting(true);
    try {
      let downloadUrl = resForm.downloadUrl || '#';
      let fileSize = resForm.fileSize || 'Unknown';

      // 1. Upload File if selected
      if (selectedFile) {
        downloadUrl = await StorageService.uploadFile(selectedFile, 'resources');
        fileSize = (selectedFile.size / (1024 * 1024)).toFixed(2) + ' MB';
      }

      if (editingResId) {
        await ResourceService.update(editingResId, {
            ...resForm,
            downloadUrl,
            fileSize
        });
      } else {
        const newResData = {
          title: resForm.title!,
          description: resForm.description || '',
          fileType: resForm.fileType as any || 'pdf',
          downloadUrl: downloadUrl,
          fileSize: fileSize
        };
        await ResourceService.create(newResData as any);
      }
      setResForm(initialResForm);
      setSelectedFile(null);
      setSelectedFileName('');
      setEditingResId(null);
      await refreshAllData();
    } catch (err) {
      console.error(err);
      alert("Error saving resource/uploading file.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const editResource = (e: React.MouseEvent, res: ResourceItem) => {
    e.stopPropagation();
    if (res.id.startsWith('mock-')) {
        alert("Mock resources cannot be edited. Please add a real file.");
        return;
    }
    setResForm(res);
    setEditingResId(res.id);
    setSelectedFile(null);
    setSelectedFileName(''); // Don't show filename unless new one picked
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteResource = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (id.startsWith('mock-')) {
        alert("Mock resources cannot be deleted. Add a real file to clear them.");
        return;
    }

    if(window.confirm('Delete this file?')) {
      setIsDeleting(id);
      try {
        await ResourceService.delete(id);
        await refreshAllData();
        if(editingResId === id) {
          setEditingResId(null);
          setResForm(initialResForm);
          setSelectedFile(null);
          setSelectedFileName('');
        }
      } catch (err) {
        alert("Error deleting resource.");
      } finally {
        setIsDeleting(null);
      }
    }
  };

  // --- INQUIRY HANDLERS ---
  const deleteInquiry = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (id.startsWith('mock-')) {
        alert("Cannot delete mock inquiries.");
        return;
    }
    if(window.confirm('Delete this message?')) {
      setIsDeleting(id);
      try {
        await InquiryService.delete(id);
        await refreshAllData();
      } catch(err) {
        alert("Error deleting inquiry.");
      } finally {
        setIsDeleting(null);
      }
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Admin Header */}
      <div className="bg-brand-navy text-white shadow-lg sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="text-brand-accent" />
            <div>
              <h1 className="text-xl font-bold leading-tight">Admin Dashboard</h1>
              {currentUserEmail && (
                 <p className="text-xs text-gray-300 flex items-center gap-1">
                   <User size={10} /> {currentUserEmail}
                 </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg flex items-center gap-2 text-sm transition-colors">
                <ArrowLeft size={16} /> <span className="hidden sm:inline">Website</span>
            </button>
            <button onClick={onLogout} className="bg-red-500/80 hover:bg-red-600 px-4 py-2 rounded-lg flex items-center gap-2 text-sm transition-colors border border-red-500">
                <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button 
            onClick={() => { setActiveTab('blogs'); setEditingPostId(null); setBlogForm(initialBlogForm); }}
            className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all ${activeTab === 'blogs' ? 'bg-white text-brand-navy shadow-md border-l-4 border-brand-navy' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
          >
            <FileText size={20} /> Manage Blogs
          </button>
          <button 
            onClick={() => { setActiveTab('notifications'); setEditingNoteId(null); setNoteForm(initialNoteForm); }}
            className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all ${activeTab === 'notifications' ? 'bg-white text-brand-navy shadow-md border-l-4 border-brand-navy' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
          >
            <Bell size={20} /> Exam Alerts & News
          </button>
          <button 
            onClick={() => { setActiveTab('downloads'); setEditingResId(null); setResForm(initialResForm); }}
            className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all ${activeTab === 'downloads' ? 'bg-white text-brand-navy shadow-md border-l-4 border-brand-navy' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
          >
            <Download size={20} /> Reference Files
          </button>
          <button 
            onClick={() => { setActiveTab('inquiries'); }}
            className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all ${activeTab === 'inquiries' ? 'bg-white text-brand-navy shadow-md border-l-4 border-brand-navy' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
          >
            <MessageSquare size={20} /> Messages ({inquiries.length})
          </button>
        </div>

        {/* --- BLOGS SECTION --- */}
        {activeTab === 'blogs' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in">
            {/* Form */}
            <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  {editingPostId ? <Pencil size={18} /> : <Plus size={18} />} 
                  {editingPostId ? 'Edit Article' : 'Add New Article'}
                </span>
                {editingPostId && (
                  <button onClick={() => { setEditingPostId(null); setBlogForm(initialBlogForm); setSelectedBlogImage(null); }} className="text-xs text-red-500 flex items-center gap-1 hover:underline">
                    <XCircle size={14} /> Cancel
                  </button>
                )}
              </h2>
              <form onSubmit={handleBlogSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Article Title</label>
                  <input required type="text" className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-brand-accent outline-none" 
                    value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} placeholder="Enter article title" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 focus:ring-2 focus:ring-brand-accent outline-none"
                    value={blogForm.category} onChange={e => setBlogForm({...blogForm, category: e.target.value})}>
                    <option>General</option>
                    <option>Engineering</option>
                    <option>Medical</option>
                    <option>Study Tips</option>
                  </select>
                </div>
                
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                  <div className="flex flex-col gap-2">
                     <div className="relative border border-gray-300 rounded-lg p-3 bg-white flex items-center gap-3 cursor-pointer hover:bg-blue-50 transition-colors">
                        <ImageIcon size={20} className="text-gray-400" />
                        <span className="text-sm text-gray-600 truncate flex-1">
                           {selectedBlogImage ? selectedBlogImage.name : "Choose File..."}
                        </span>
                        <input 
                           type="file" 
                           accept="image/*"
                           onChange={handleBlogImageSelect}
                           className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                     </div>
                     <p className="text-xs text-gray-400 text-center">- OR -</p>
                     <input type="text" className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-brand-accent outline-none text-sm" placeholder="Paste Image URL directly..."
                      value={blogForm.imageUrl} onChange={e => setBlogForm({...blogForm, imageUrl: e.target.value})} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea required rows={6} className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-brand-accent outline-none"
                    value={blogForm.content} onChange={e => setBlogForm({...blogForm, content: e.target.value})} placeholder="Write your article here..." />
                </div>
                <button type="submit" disabled={isSubmitting} className={`w-full text-white py-2 rounded transition-colors flex justify-center items-center gap-2 ${editingPostId ? 'bg-orange-500 hover:bg-orange-600' : 'bg-brand-navy hover:bg-brand-accent'} ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}>
                  {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} 
                  {editingPostId ? 'Update Article' : 'Publish Article'}
                </button>
              </form>
            </div>
            
            {/* List */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-bold text-gray-800">Published Articles ({posts.length})</h2>
              {posts.map(post => (
                <div key={post.id} className={`bg-white p-4 rounded-xl shadow-sm border flex justify-between items-start gap-4 ${editingPostId === post.id ? 'border-orange-400 ring-2 ring-orange-100' : 'border-gray-200'}`}>
                  <div className="flex gap-4">
                    <img src={post.imageUrl} alt="" className="w-20 h-20 object-cover rounded-lg bg-gray-100" />
                    <div>
                      <h3 className="font-bold text-gray-800">{post.title}</h3>
                      <p className="text-xs text-gray-500 mb-1">{post.date} • {post.category}</p>
                      <p className="text-sm text-gray-600 line-clamp-1">{post.excerpt}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => editPost(e, post)} 
                      className="text-gray-400 hover:text-brand-accent hover:bg-blue-50 p-2 rounded transition-colors" 
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                    <button 
                      onClick={(e) => deletePost(e, post.id)} 
                      disabled={isDeleting === post.id}
                      className={`text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded transition-colors ${isDeleting === post.id ? 'opacity-50 cursor-wait' : ''}`} 
                      title="Delete"
                    >
                      {isDeleting === post.id ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- NOTIFICATIONS SECTION --- */}
        {activeTab === 'notifications' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in">
             <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  {editingNoteId ? <Pencil size={18} /> : <Plus size={18} />} 
                  {editingNoteId ? 'Edit Alert' : 'Post Alert/News'}
                </span>
                {editingNoteId && (
                  <button onClick={() => { setEditingNoteId(null); setNoteForm(initialNoteForm); }} className="text-xs text-red-500 flex items-center gap-1 hover:underline">
                    <XCircle size={14} /> Cancel
                  </button>
                )}
              </h2>
              <form onSubmit={handleNoteSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input required type="text" className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-brand-accent outline-none" 
                    value={noteForm.title} onChange={e => setNoteForm({...noteForm, title: e.target.value})} placeholder="e.g. JEE Registration Open" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority Type</label>
                  <select className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 focus:ring-2 focus:ring-brand-accent outline-none"
                    value={noteForm.type} onChange={e => setNoteForm({...noteForm, type: e.target.value as any})}>
                    <option value="info">General News (Blue)</option>
                    <option value="urgent">Urgent / Important (Red)</option>
                    <option value="success">Update / Success (Green)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea required rows={3} className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-brand-accent outline-none"
                    value={noteForm.message} onChange={e => setNoteForm({...noteForm, message: e.target.value})} placeholder="Details about the exam dates..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">External Link (Optional)</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-brand-accent outline-none" placeholder="https://jeemain.nta.nic.in"
                    value={noteForm.link} onChange={e => setNoteForm({...noteForm, link: e.target.value})} />
                </div>
                <button type="submit" disabled={isSubmitting} className={`w-full text-white py-2 rounded transition-colors flex justify-center items-center gap-2 ${editingNoteId ? 'bg-orange-500 hover:bg-orange-600' : 'bg-brand-navy hover:bg-brand-accent'} ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}>
                  {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} 
                  {editingNoteId ? 'Update Notification' : 'Post Notification'}
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-bold text-gray-800">Active Alerts ({notifications.length})</h2>
              {notifications.map(note => (
                <div key={note.id} className={`bg-white p-4 rounded-xl shadow-sm border border-l-4 flex justify-between items-start gap-4 ${note.type === 'urgent' ? 'border-l-red-500' : note.type === 'success' ? 'border-l-green-500' : 'border-l-blue-500'} ${editingNoteId === note.id ? 'ring-2 ring-orange-100' : ''}`}>
                  <div>
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                      {note.title}
                      {note.type === 'urgent' && <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded font-bold uppercase">Urgent</span>}
                    </h3>
                    <p className="text-xs text-gray-500 mb-1">{note.date}</p>
                    <p className="text-sm text-gray-600">{note.message}</p>
                    {note.link && <p className="text-xs text-brand-accent mt-1 truncate max-w-md">{note.link}</p>}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => editNote(e, note)} 
                      className="text-gray-400 hover:text-brand-accent hover:bg-blue-50 p-2 rounded transition-colors" 
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                    <button 
                      onClick={(e) => deleteNote(e, note.id)} 
                      disabled={isDeleting === note.id}
                      className={`text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded transition-colors ${isDeleting === note.id ? 'opacity-50 cursor-wait' : ''}`} 
                      title="Delete"
                    >
                      {isDeleting === note.id ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- DOWNLOADS SECTION --- */}
        {activeTab === 'downloads' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in">
             <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  {editingResId ? <Pencil size={18} /> : <Plus size={18} />} 
                  {editingResId ? 'Edit File Details' : 'Add Reference File'}
                </span>
                {editingResId && (
                  <button onClick={() => { setEditingResId(null); setResForm(initialResForm); setSelectedFileName(''); setSelectedFile(null); }} className="text-xs text-red-500 flex items-center gap-1 hover:underline">
                    <XCircle size={14} /> Cancel
                  </button>
                )}
              </h2>
              <form onSubmit={handleResSubmit} className="space-y-4">
                
                {/* Efficient File Picker */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload File {editingResId && '(Optional)'}</label>
                  <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 bg-white hover:bg-blue-50 transition-colors text-center cursor-pointer group">
                    <input 
                      type="file" 
                      accept=".pdf,.ppt,.pptx,.doc,.docx"
                      onChange={handleFileSelect}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <UploadCloud className="mx-auto text-gray-400 group-hover:text-brand-accent mb-2" size={32} />
                    <p className="text-sm text-gray-600 font-medium">
                      {selectedFileName ? <span className="text-brand-accent">{selectedFileName}</span> : "Click to Upload PDF or PPT"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Supports PPT, PDF, DOC</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">File Title</label>
                  <input required type="text" className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-brand-accent outline-none" 
                    value={resForm.title} onChange={e => setResForm({...resForm, title: e.target.value})} placeholder="Auto-fills from filename" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                  <textarea rows={2} className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-brand-accent outline-none"
                    value={resForm.description} onChange={e => setResForm({...resForm, description: e.target.value})} placeholder="Brief info..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">File Type</label>
                  <select className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 focus:ring-2 focus:ring-brand-accent outline-none"
                    value={resForm.fileType} onChange={e => setResForm({...resForm, fileType: e.target.value as any})}>
                    <option value="pdf">PDF Document</option>
                    <option value="ppt">PowerPoint (PPT)</option>
                    <option value="doc">Word Doc</option>
                  </select>
                </div>
                
                <button type="submit" disabled={isSubmitting} className={`w-full text-white py-2 rounded transition-colors flex justify-center items-center gap-2 ${editingResId ? 'bg-orange-500 hover:bg-orange-600' : 'bg-brand-navy hover:bg-brand-accent'} ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}>
                  {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} 
                  {editingResId ? 'Update Resource' : 'Add to Downloads'}
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-bold text-gray-800">Files Available ({resources.length})</h2>
               {resources.map(res => (
                <div key={res.id} className={`bg-white p-4 rounded-xl shadow-sm border flex justify-between items-center gap-4 ${editingResId === res.id ? 'border-orange-400 ring-2 ring-orange-100' : 'border-gray-200'}`}>
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-100 p-3 rounded">
                       {res.fileType === 'pdf' ? <FileText className="text-red-500" /> : res.fileType === 'ppt' ? <LayoutDashboard className="text-orange-500" /> : <FileText className="text-blue-500" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{res.title}</h3>
                      <p className="text-xs text-gray-500">{res.fileType.toUpperCase()} • {res.fileSize}</p>
                      <p className="text-sm text-gray-600 line-clamp-1">{res.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => editResource(e, res)} 
                      className="text-gray-400 hover:text-brand-accent hover:bg-blue-50 p-2 rounded transition-colors" 
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                    <button 
                      onClick={(e) => deleteResource(e, res.id)} 
                      disabled={isDeleting === res.id}
                      className={`text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded transition-colors ${isDeleting === res.id ? 'opacity-50 cursor-wait' : ''}`} 
                      title="Delete"
                    >
                      {isDeleting === res.id ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- INQUIRIES SECTION --- */}
        {activeTab === 'inquiries' && (
          <div className="animate-in fade-in">
             <h2 className="text-lg font-bold text-gray-800 mb-6">Received Messages ({inquiries.length})</h2>
             <div className="grid grid-cols-1 gap-4">
               {inquiries.map((inq) => (
                 <div key={inq.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-6 hover:shadow-md transition-all">
                   
                   {/* Avatar/Icon */}
                   <div className="hidden md:block">
                     <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-brand-accent">
                       <User size={24} />
                     </div>
                   </div>

                   {/* Content */}
                   <div className="flex-1">
                     <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2 gap-2">
                       <div>
                         <h3 className="font-bold text-lg text-brand-navy">{inq.name}</h3>
                         <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                           <span className="flex items-center gap-1"><Phone size={14} /> {inq.phone}</span>
                           <span className="flex items-center gap-1"><Calendar size={14} /> {inq.date}</span>
                         </div>
                       </div>
                       <button 
                         onClick={(e) => deleteInquiry(e, inq.id)}
                         disabled={isDeleting === inq.id}
                         className={`text-gray-400 hover:text-red-500 p-2 rounded hover:bg-red-50 transition-colors self-end md:self-center ${isDeleting === inq.id ? 'opacity-50 cursor-wait' : ''}`}
                       >
                         {isDeleting === inq.id ? <Loader2 className="animate-spin" size={20} /> : <Trash2 size={20} />}
                       </button>
                     </div>
                     
                     <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-gray-700 leading-relaxed text-sm">
                       {inq.message}
                     </div>
                   </div>
                 </div>
               ))}
               
               {inquiries.length === 0 && (
                 <div className="text-center py-20 text-gray-400">
                   <MessageSquare size={48} className="mx-auto mb-4 opacity-30" />
                   <p>No messages yet.</p>
                 </div>
               )}
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;