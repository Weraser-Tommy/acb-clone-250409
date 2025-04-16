
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';

interface Declaration {
  id: string;
  reference: string;
  productName: string;
  date: string;
  status: string;
  declarationType: "import" | "export";
  taxAmount: string;
  dutyRate: string;
  totalTaxAmount: string;
  hsCode: string;
  countryOrigin: string;
  itemPrice: string;
  declarationNumber: string;
}

interface DeclarationDetailsProps {
  declaration: Declaration | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DeclarationDetails: React.FC<DeclarationDetailsProps> = ({
  declaration,
  open,
  onOpenChange
}) => {
  const { t } = useLanguage();
  
  if (!declaration) return null;
  
  const getStatusBadge = (status: string) => {
    let badgeClass = "bg-green-500 hover:bg-green-600";
    
    // Adjust color based on status
    if (status.includes("취하") || status.includes("각하")) {
      badgeClass = "bg-red-500 hover:bg-red-600";
    } else if (status.includes("대기") || status.includes("접수")) {
      badgeClass = "bg-blue-500 hover:bg-blue-600";
    } else if (status.includes("선별") || status.includes("검증")) {
      badgeClass = "bg-yellow-500 hover:bg-yellow-600";
    }
    
    return (
      <Badge className={badgeClass}>
        {status}
      </Badge>
    );
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{t("declarationDetails") || "신고 상세 정보"}</span>
            {getStatusBadge(declaration.status)}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-2">
            <div className="font-medium">{t("declarationReference") || "참조번호"}</div>
            <div>{declaration.reference}</div>
          </div>
          
          <div className="grid grid-cols-2 items-center gap-2">
            <div className="font-medium">{t("declarationNumber") || "신고번호"}</div>
            <div>{declaration.declarationNumber}</div>
          </div>
          
          <div className="grid grid-cols-2 items-center gap-2">
            <div className="font-medium">{t("productName") || "제품명"}</div>
            <div>{declaration.productName}</div>
          </div>
          
          <div className="grid grid-cols-2 items-center gap-2">
            <div className="font-medium">{t("submissionDate") || "제출일"}</div>
            <div>{declaration.date}</div>
          </div>
          
          <Separator />
          
          <div className="text-base font-semibold">
            {t("taxDetails") || "세액 상세"}
          </div>
          
          <div className="grid grid-cols-2 items-center gap-2">
            <div className="font-medium">{t("hsCode") || "HS 코드"}</div>
            <div>{declaration.hsCode}</div>
          </div>
          
          <div className="grid grid-cols-2 items-center gap-2">
            <div className="font-medium">{t("countryOrigin") || "원산지"}</div>
            <div>{declaration.countryOrigin}</div>
          </div>
          
          <div className="grid grid-cols-2 items-center gap-2">
            <div className="font-medium">{t("itemPrice") || "물품가격"}</div>
            <div>₩{Number(declaration.itemPrice).toLocaleString()}</div>
          </div>
          
          <div className="grid grid-cols-2 items-center gap-2">
            <div className="font-medium">{t("dutyRate") || "세율"}</div>
            <div>{declaration.dutyRate}</div>
          </div>
          
          <div className="grid grid-cols-2 items-center gap-2 bg-muted p-2 rounded-md">
            <div className="font-medium">{t("taxAmount") || "세액"}</div>
            <div className="text-primary font-semibold">₩{Number(declaration.taxAmount).toLocaleString()}</div>
          </div>
          
          <div className="grid grid-cols-2 items-center gap-2 bg-muted p-2 rounded-md">
            <div className="font-medium">{t("totalTaxAmount") || "총 세액"}</div>
            <div className="text-primary font-semibold">₩{Number(declaration.totalTaxAmount).toLocaleString()}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeclarationDetails;
