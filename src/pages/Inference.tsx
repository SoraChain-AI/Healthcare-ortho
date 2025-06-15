
import { useState } from 'react';
import {
  Upload,
  FileText,
  X,
  Shield,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { Input } from "@/components/ui/input";
import { Badge } from '@/components/common/Badge';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const MAX_FILE_SIZE_MB = 5;
const VALID_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png'
];

const Inference = () => {
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [fileUploadError, setFileUploadError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileUploadError('');
    const files = e.target.files;
    if (!files) return;
    const newFiles: File[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!VALID_TYPES.includes(file.type)) {
        setFileUploadError('Only PDF, DOCX, JPG, and PNG files are accepted.');
        return;
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setFileUploadError('Files must be smaller than 5MB.');
        return;
      }
      newFiles.push(file);
    }
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileUploadError('');
    const files = Array.from(e.dataTransfer.files);
    const toAdd: File[] = [];

    for (const file of files) {
      if (!VALID_TYPES.includes(file.type)) {
        setFileUploadError('Only PDF, DOCX, JPG, and PNG files are accepted.');
        return;
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setFileUploadError('Files must be smaller than 5MB.');
        return;
      }
      toAdd.push(file);
    }
    setUploadedFiles([...uploadedFiles, ...toAdd]);
  };

  const removeFile = (idx: number) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(idx, 1);
    setUploadedFiles(newFiles);
  };

  const handleUploadClick = () => {
    document.getElementById('file-upload')?.click();
  };

  const handleSubmit = () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: 'No files uploaded',
        description: 'Please upload at least one medical report or x-ray before submitting.',
        variant: 'destructive'
      });
      return;
    }
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setDialogOpen(true);
      setUploadedFiles([]);
    }, 1800);
  };

  return (
    <Layout>
      <SectionHeader
        title="AI Medical Report Consultation"
        description="Upload your reports or x-rays for expert AI-powered assessment"
        icon={<Upload className="h-8 w-8" />}
      />
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <Card className="glass-card max-w-2xl w-full backdrop-blur-lg border-2 border-sorachain-light/30 shadow-xl relative animate-fade-in">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gradient mb-2">
              Get a Personalized AI Consultation
            </CardTitle>
            <CardDescription className="text-md">
              Users around the world can upload medical reports and knee x-rays <br />
              Our decentralized AI reviews your information securely and provides a specialist-level summary, all while preserving your privacy.
            </CardDescription>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <Badge label="Liquid Glass UX" variant="privacy" />
              <Badge label="HIPAA Compliant" variant="privacy" />
              <Badge label="100% Private & Secure" variant="privacy" />
            </div>
          </CardHeader>
          <CardContent>
            <div
              className={`transition-all duration-300 p-0`}
            >
              <div
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}
                className="border-2 border-dashed border-sorachain-light hover:border-sorachain-primary transition rounded-2xl bg-white/60 dark:bg-sorachain-dark/50 flex flex-col items-center justify-center p-8 min-h-[200px] glass-card glow-effect cursor-pointer"
                onClick={handleUploadClick}
                style={{
                  boxShadow:
                    '0 12px 45px 0 rgba(102,134,255,0.12), 0 1.5px 4px 0 rgba(102,134,255,0.15)'
                }}
                tabIndex={0}
                role="button"
                aria-label="Upload medical reports"
              >
                <Upload className="h-12 w-12 text-sorachain-primary mb-3 animate-bounce" />
                <div className="text-lg font-semibold mb-1">Click or drag & drop to upload</div>
                <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  (PDF, DOCX, JPG, PNG • Max 5MB each)
                </div>
                <Input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  multiple
                  accept=".pdf,.docx,.jpg,.jpeg,.png,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png"
                  onChange={handleFileChange}
                />
              </div>
              {fileUploadError && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-3 rounded-md text-sm mt-3 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {fileUploadError}
                </div>
              )}
            </div>
            {uploadedFiles.length > 0 && (
              <div className="bg-gray-50/60 dark:bg-gray-800/60 rounded-lg mt-6 p-4 animate-fade-in">
                <h3 className="text-base font-bold mb-2 text-sorachain-primary">Files ready for consultation:</h3>
                <ul className="space-y-2">
                  {uploadedFiles.map((file, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-center bg-white/70 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 px-3 py-2 rounded-md"
                    >
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-sorachain-primary" />
                        <span className="truncate max-w-xs">{file.name}</span>
                        <span className="ml-2 text-gray-500 text-xs">
                          ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(idx)}
                        className="h-7 w-7 p-0"
                        title="Remove"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="pt-8 space-y-3">
              <Button
                onClick={handleSubmit}
                className="w-full sorachain-button transition-all duration-300 text-lg font-bold shadow-md py-4"
                disabled={isUploading}
              >
                {isUploading
                  ? <><Loader2 className="h-5 w-5 mr-2 animate-spin" /> Uploading...</>
                  : 'Submit for Consultation'}
              </Button>
              <div className="flex items-center justify-center pt-3">
                <Shield className="h-5 w-5 text-sorachain-primary mr-2" />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Your reports are processed anonymously and securely with end-to-end encryption.
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-1 items-center border-t border-sorachain-light/20 pt-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              No diagnosis will be provided without review by a certified specialist.
            </p>
            <div className="flex items-center text-amber-500 dark:text-amber-400 text-xs mt-1">
              <AlertCircle className="h-3 w-3 mr-1" />
              AI consultation does not replace a professional medical opinion.
            </div>
          </CardFooter>
        </Card>
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg text-center">
          <DialogHeader>
            <DialogTitle>Files Submitted Successfully</DialogTitle>
            <DialogDescription>
              Thank you for submitting your medical reports! <br />
              Our AI and medical specialists will review them and provide feedback as soon as possible. <br />
              You can close this window and check back later for your results.
            </DialogDescription>
          </DialogHeader>
          <Button
            className="mt-6 w-full"
            onClick={() => setDialogOpen(false)}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Inference;
