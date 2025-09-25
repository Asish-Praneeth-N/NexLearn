"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { BookOpen, MessageCircle, X, Send, Bot, User, Download } from 'lucide-react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const Notes = () => {
  const { courseId } = useParams();
  const [notes, setNotes] = useState<any[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<number>(0);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState<boolean>(false);

  useEffect(() => {
    GetNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const GetNotes = async () => {
    try {
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "notes"
      });
      setNotes(result?.data);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: chatInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('/api/chat', {
        message: chatInput,
        context: notes[selectedChapter]?.notes || ''
      });

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.data.message,
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatContent = (htmlContent: string) => {
    const cleanedContent = htmlContent.replace(/```html\s*|\s*```$/g, '');
    
    return cleanedContent
      .replace(/<pre>\s*<code>([\s\S]*?)<\/code>\s*<\/pre>/g, 
        '<div class="code-block bg-black text-white p-6 rounded-lg my-6 overflow-x-auto border border-white/80">$1</div>')
      .replace(/<code(?![^>]*class)(.*?)>(.*?)<\/code>/g, 
        '<code class="inline-code bg-black text-white px-3 py-1 rounded text-sm font-mono border border-white/80">$2</code>')
      .replace(/<h1([^>]*)>/g, '<h1 class="text-4xl font-bold text-white mb-8 pb-4 border-b-2 border-white/80"$1>')
      .replace(/<h2([^>]*)>/g, '<h2 class="text-3xl font-semibold text-white mt-10 mb-6"$1>')
      .replace(/<h3([^>]*)>/g, '<h3 class="text-2xl font-medium text-white/90 mt-8 mb-4"$1>')
      .replace(/<p([^>]*)>/g, '<p class="text-white/90 leading-relaxed mb-6 text-lg"$1>')
      .replace(/<strong([^>]*)>/g, '<strong class="font-semibold text-white"$1>')
      .replace(/<em([^>]*)>/g, '<em class="italic text-white/90"$1>')
      .replace(/<ul([^>]*)>/g, '<ul class="list-disc pl-8 mb-6 space-y-3"$1>')
      .replace(/<ol([^>]*)>/g, '<ol class="list-decimal pl-8 mb-6 space-y-3"$1>')
      .replace(/<li([^>]*)>/g, '<li class="text-white/90 text-lg"$1>');
  };

  const downloadStyledPDF = async () => {
    if (isPdfGenerating || notes.length === 0) return;
    
    setIsPdfGenerating(true);
    
    try {
      const noteContent = notes[selectedChapter]?.notes || '';
      const titleMatch = noteContent.match(/<h1[^>]*>(.*?)<\/h1>/);
      const title = titleMatch ? 
        titleMatch[1].replace(/[📚⚛️🚀✨🎯🔧📝💡🌟]/g, '').trim() : 
        `Chapter ${selectedChapter + 1}`;

      // Create a temporary container for PDF rendering
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      tempContainer.style.width = '210mm';
      tempContainer.style.backgroundColor = '#000000';
      tempContainer.style.fontFamily = 'system-ui, -apple-system, sans-serif';
      
      // Create the styled content
      tempContainer.innerHTML = `
        <div style="padding: 40px; max-width: 800px; margin: 0 auto; background: #000000;">
          <div style="text-align: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 3px solid #ffffff;">
            <h1 style="font-size: 28px; font-weight: bold; color: #ffffff; margin: 0; line-height: 1.2;">
              ${title}
            </h1>
            <p style="color: #ffffff; margin-top: 8px; font-size: 14px;">
              Chapter ${selectedChapter + 1} of ${notes.length}
            </p>
          </div>
          <div class="pdf-content" style="line-height: 1.6;">
            ${formatContentForPDF(noteContent)}
          </div>
        </div>
      `;

      document.body.appendChild(tempContainer);

      // Apply PDF-specific styles
      const style = document.createElement('style');
      style.textContent = `
        .pdf-content h1 {
          font-size: 24px !important;
          font-weight: bold !important;
          color: #ffffff !important;
          margin: 30px 0 20px 0 !important;
          padding-bottom: 10px !important;
          border-bottom: 2px solid #ffffff !important;
          page-break-after: avoid !important;
        }
        .pdf-content h2 {
          font-size: 20px !important;
          font-weight: 600 !important;
          color: #ffffff !important;
          margin: 25px 0 15px 0 !important;
          page-break-after: avoid !important;
        }
        .pdf-content h3 {
          font-size: 18px !important;
          font-weight: 500 !important;
          color: #ffffff !important;
          margin: 20px 0 12px 0 !important;
          page-break-after: avoid !important;
        }
        .pdf-content p {
          color: #ffffff !important;
          line-height: 1.7 !important;
          margin-bottom: 16px !important;
          text-align: justify !important;
        }
        .pdf-content strong {
          font-weight: 600 !important;
          color: #ffffff !important;
        }
        .pdf-content em {
          font-style: italic !important;
          color: #ffffff !important;
        }
        .pdf-content ul, .pdf-content ol {
          margin: 16px 0 16px 24px !important;
          padding: 0 !important;
        }
        .pdf-content li {
          color: #ffffff !important;
          margin-bottom: 8px !important;
          line-height: 1.6 !important;
        }
        .pdf-content .code-block {
          background: #000000 !important;
          border: 1px solid #ffffff !important;
          border-radius: 6px !important;
          padding: 16px !important;
          margin: 20px 0 !important;
          font-family: 'Courier New', monospace !important;
          font-size: 12px !important;
          line-height: 1.5 !important;
          overflow-x: auto !important;
          page-break-inside: avoid !important;
          color: #ffffff !important;
        }
        .pdf-content .inline-code {
          background: #000000 !important;
          color: #ffffff !important;
          padding: 2px 6px !important;
          border-radius: 4px !important;
          font-family: 'Courier New', monospace !important;
          font-size: 13px !important;
          border: 1px solid #ffffff !important;
        }
        .pdf-content pre {
          margin: 0 !important;
          white-space: pre-wrap !important;
          word-wrap: break-word !important;
        }
        .pdf-content code {
          font-family: 'Courier New', monospace !important;
          color: #ffffff !important;
        }
      `;
      document.head.appendChild(style);

      // Wait for fonts and styles to load
      await new Promise(resolve => setTimeout(resolve, 500));

      // Generate PDF using html2canvas and jsPDF
      const canvas = await html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#000000',
        width: tempContainer.scrollWidth,
        height: tempContainer.scrollHeight,
        onclone: (clonedDoc) => {
          const clonedContainer = clonedDoc.querySelector('div');
          if (clonedContainer) {
            clonedContainer.style.width = '210mm';
            clonedContainer.style.transform = 'none';
          }
        }
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Add additional pages if content is longer
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      // Clean up
      document.body.removeChild(tempContainer);
      document.head.removeChild(style);

      // Download the PDF
      pdf.save(`${title}.pdf`);
      
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsPdfGenerating(false);
    }
  };

  const formatContentForPDF = (htmlContent: string) => {
    return htmlContent
      .replace(/```html\s*|\s*```$/g, '')
      .replace(/<pre>\s*<code>([\s\S]*?)<\/code>\s*<\/pre>/g, 
        '<div class="code-block"><pre><code>$1</code></pre></div>')
      .replace(/<code(?![^>]*class)(.*?)>(.*?)<\/code>/g, 
        '<code class="inline-code">$2</code>')
      .replace(/<h1([^>]*)>/g, '<h1$1>')
      .replace(/<h2([^>]*)>/g, '<h2$1>')
      .replace(/<h3([^>]*)>/g, '<h3$1>')
      .replace(/<p([^>]*)>/g, '<p$1>')
      .replace(/<strong([^>]*)>/g, '<strong$1>')
      .replace(/<em([^>]*)>/g, '<em$1>')
      .replace(/<ul([^>]*)>/g, '<ul$1>')
      .replace(/<ol([^>]*)>/g, '<ol$1>')
      .replace(/<li([^>]*)>/g, '<li$1>');
  };

  return (
    <div className="flex lg:flex-row flex-col min-h-screen bg-black">
      {/* Sidebar */}
      <div className="lg:w-80 w-full bg-black border-r border-white/80 shadow-lg overflow-hidden lg:sticky lg:top-0 lg:h-screen">
        <div className="p-4 border-b border-white/80 bg-black">
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-white" />
            <h2 className="text-xl font-semibold text-white">Course Chapters</h2>
          </div>
        </div>
        <ScrollArea className="lg:h-[calc(100vh-72px)] h-auto pb-6">
          <div className="p-4 space-y-3">
            {notes.map((note, index) => {
              const titleMatch = note.notes.match(/<h1[^>]*>(.*?)<\/h1>/);
              const title = titleMatch ? 
                titleMatch[1].replace(/[📚⚛️🚀✨🎯🔧📝💡🌟]/g, '').trim() : 
                `Chapter ${index + 1}`;
              
              return (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-white/20 border border-white/80 ${
                    selectedChapter === index 
                      ? 'bg-white/10 border-white shadow-md shadow-white/30' 
                      : 'bg-black hover:bg-white/5 hover:border-white'
                  }`}
                  onClick={() => setSelectedChapter(index)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className={`text-sm font-medium text-white`}>
                      {title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className={`text-xs text-white/90`}>
                      Chapter {index + 1} of {notes.length}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex justify-end mb-4">
            <Button
              onClick={downloadStyledPDF}
              className={`transition-all duration-300 ${
                isPdfGenerating 
                  ? 'bg-black/50 cursor-not-allowed text-white border-white/80' 
                  : 'bg-white hover:bg-black text-black hover:text-white border-white/80 hover:border-white shadow-md hover:shadow-white/30'
              }`}
              size="sm"
              disabled={notes.length === 0 || isPdfGenerating}
            >
              <Download className={`h-4 w-4 mr-2 ${isPdfGenerating ? 'animate-spin' : ''}`} />
              {isPdfGenerating ? 'Generating PDF...' : 'Download PDF'}
            </Button>
          </div>
          <ScrollArea className="lg:h-screen h-auto">
            {notes.length > 0 && (
              <div className="bg-black rounded-xl shadow-lg border border-white/80">
                <div className="p-6 sm:p-8">
                  <div 
                    className="prose prose-lg max-w-none prose-invert"
                    dangerouslySetInnerHTML={{ 
                      __html: formatContent(notes[selectedChapter]?.notes || '') 
                    }} 
                  />
                </div>
              </div>
            )}
            {notes.length === 0 && (
              <div className="text-center py-16">
                <BookOpen className="h-16 w-16 text-white/90 mx-auto mb-6" />
                <p className="text-white/90 text-lg">Loading course content...</p>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>

      {/* Chat Widget */}
      <div className="fixed bottom-4 right-4 z-50">
        {!isChatOpen ? (
          <Button
            onClick={() => setIsChatOpen(true)}
            className="h-14 w-14 rounded-full bg-white hover:bg-black hover:text-white text-black shadow-lg hover:shadow-white/30 transition-all duration-300 hover:scale-105"
            size="lg"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        ) : (
          <Card className="w-full sm:w-80 h-[28rem] shadow-lg border-white/80 bg-black">
            <CardHeader className="bg-black text-white rounded-t-lg border-b border-white/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bot className="h-5 w-5" />
                  <CardTitle className="text-sm">AI Study Assistant</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsChatOpen(false)}
                  className="text-white hover:bg-black/50 h-8 w-8 p-0 transition-all duration-200"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex flex-col h-[calc(28rem-60px)] bg-black">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {chatMessages.length === 0 && (
                    <div className="text-center text-white/90 py-8">
                      <Bot className="h-10 w-10 mx-auto mb-3 text-white" />
                      <p className="text-sm">Ask me anything about this chapter!</p>
                    </div>
                  )}
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div className={`flex gap-3 max-w-[80%] ${
                        message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}>
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                          message.role === 'user' 
                            ? 'bg-white text-black' 
                            : 'bg-black text-white border border-white/80'
                        }`}>
                          {message.role === 'user' ? 
                            <User className="h-4 w-4" /> : 
                            <Bot className="h-4 w-4" />
                          }
                        </div>
                        <div className={`p-3 rounded-lg text-sm transition-all duration-200 ${
                          message.role === 'user'
                            ? 'bg-white text-black shadow-md'
                            : 'bg-black text-white border border-white/80'
                        }`}>
                          {message.content}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center border border-white/80">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-black p-3 rounded-lg text-sm border border-white/80">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              <Separator className="bg-white/80" />
              <div className="p-4 bg-black">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about this chapter..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                    className="flex-1 border-white/80 bg-black text-white placeholder-white/70 focus:border-white transition-all duration-200"
                    disabled={isLoading}
                  />
                  <Button 
                    onClick={sendChatMessage}
                    disabled={!chatInput.trim() || isLoading}
                    size="sm"
                    className="bg-white hover:bg-black text-black hover:text-white border-white/80 transition-all duration-200"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <style jsx global>{`
        .code-block {
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          background: #000000 !important;
          border: 1px solid #ffffff !important;
          border-radius: 6px;
        }
        .inline-code {
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          background: #000000 !important;
          border: 1px solid #ffffff !important;
        }
        .prose pre {
          background: transparent !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        .prose code {
          background: transparent !important;
          padding: 0 !important;
          font-weight: normal !important;
          color: white !important;
        }
        .prose pre code {
          background: transparent !important;
        }
        .prose-invert {
          color: #ffffff;
        }
        .prose-invert h1,
        .prose-invert h2,
        .prose-invert h3,
        .prose-invert h4 {
          color: white;
        }
        .prose-invert strong {
          color: white;
        }
        .prose-invert blockquote {
          border-left-color: #ffffff;
          color: #ffffff;
        }
        /* Scrollbar Styling */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #000000;
        }
        ::-webkit-scrollbar-thumb {
          background: #ffffff;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #ffffff;
        }
        /* Responsive Adjustments */
        @media (max-width: 1024px) {
          .lg\\:flex-row {
            flex-direction: column !important;
          }
          .lg\\:w-80 {
            width: 100% !important;
          }
          .lg\\:h-screen {
            height: auto !important;
          }
          .lg\\:sticky {
            position: relative !important;
          }
        }
        @media (max-width: 640px) {
          .sm\\:w-80 {
            width: 100% !important;
            max-width: 90vw !important;
          }
          .sm\\:px-6 {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
          .p-4 {
            padding: 0.75rem !important;
          }
          .p-6 {
            padding: 1rem !important;
          }
          .p-8 {
            padding: 1.25rem !important;
          }
          .max-w-4xl {
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Notes;