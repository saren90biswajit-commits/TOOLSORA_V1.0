import { useState, FormEvent } from "react";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Send, CheckCircle2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success("Message sent successfully!");
    }, 1500);
  };

  return (
    <LegalLayout title="Contact Us">
      <div className="max-w-2xl">
        <p className="text-lg text-slate-600 mb-8">
          Have a question, feedback, or need support? We'd love to hear from you. Fill out the form below and our team will get back to you as soon as possible.
        </p>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h3>
            <p className="text-slate-600">
              Thank you for reaching out to ToolsOra. We've received your message and will respond shortly.
            </p>
            <Button 
              variant="outline" 
              className="mt-6"
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: "", email: "", subject: "", message: "" });
              }}
            >
              Send Another Message
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">First Name</Label>
                <Input id="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <select 
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                required
              >
                <option value="">Select a topic</option>
                <option value="support">General Support</option>
                <option value="feedback">Feature Suggestion / Feedback</option>
                <option value="bug">Report an Issue / Bug</option>
                <option value="business">Business Inquiry</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                placeholder="How can we help you today?" 
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
                className="resize-none"
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6">
              {isSubmitting ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        )}

        <div className="mt-12 pt-8 border-t border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Other ways to connect</h3>
          <div className="flex items-center gap-3 text-slate-600">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
              <Mail className="w-5 h-5 text-slate-500" />
            </div>
            <span>Email us directly at: <strong>support@toolsora.in</strong></span>
          </div>
        </div>
      </div>
    </LegalLayout>
  );
}
