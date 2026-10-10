// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-emerald-900 text-emerald-100 py-4 mt-16 border-t border-emerald-800">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-center md:text-left space-y-4 md:space-y-0">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center justify-center md:justify-start space-x-2">
            <span>🛒</span>
            <span>বাজার দর</span>
          </h2>
          <p className="text-xs text-emerald-300 mt-1">প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        </div>
        <div className="text-xs text-emerald-300 max-w-sm">
          “সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।”
        </div>
      </div>
    </footer>
  );
}