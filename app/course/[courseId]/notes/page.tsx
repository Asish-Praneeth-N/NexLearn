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
        '<div class="code-block bg-gray-900 text-white p-4 rounded-lg my-4 overflow-x-auto"><pre><code>$1</code></pre></div>')
      .replace(/<code(?![^>]*class)(.*?)>(.*?)<\/code>/g, 
        '<code class="inline-code bg-gray-100 text-red-600 px-2 py-1 rounded text-sm font-mono">$2</code>')
      .replace(/<h1([^>]*)>/g, '<h1 class="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500"$1>')
      .replace(/<h2([^>]*)>/g, '<h2 class="text-2xl font-semibold text-gray-800 mt-8 mb-4"$1>')
      .replace(/<h3([^>]*)>/g, '<h3 class="text-xl font-medium text-gray-700 mt-6 mb-3"$1>')
      .replace(/<p([^>]*)>/g, '<p class="text-gray-700 leading-relaxed mb-4"$1>')
      .replace(/<strong([^>]*)>/g, '<strong class="font-semibold text-gray-900"$1>')
      .replace(/<em([^>]*)>/g, '<em class="italic text-blue-700"$1>')
      .replace(/<ul([^>]*)>/g, '<ul class="list-disc pl-6 mb-4 space-y-2"$1>')
      .replace(/<ol([^>]*)>/g, '<ol class="list-decimal pl-6 mb-4 space-y-2"$1>')
      .replace(/<li([^>]*)>/g, '<li class="text-gray-700"$1>');
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
      tempContainer.style.backgroundColor = 'white';
      tempContainer.style.fontFamily = 'system-ui, -apple-system, sans-serif';
      
      // Create the styled content
      tempContainer.innerHTML = `
        <div style="padding: 40px; max-width: 800px; margin: 0 auto; background: white;">
          <div style="text-align: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 3px solid #3B82F6;">
            <h1 style="font-size: 28px; font-weight: bold; color: #1F2937; margin: 0; line-height: 1.2;">
              ${title}
            </h1>
            <p style="color: #6B7280; margin-top: 8px; font-size: 14px;">
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
          color: #1F2937 !important;
          margin: 30px 0 20px 0 !important;
          padding-bottom: 10px !important;
          border-bottom: 2px solid #3B82F6 !important;
          page-break-after: avoid !important;
        }
        .pdf-content h2 {
          font-size: 20px !important;
          font-weight: 600 !important;
          color: #374151 !important;
          margin: 25px 0 15px 0 !important;
          page-break-after: avoid !important;
        }
        .pdf-content h3 {
          font-size: 18px !important;
          font-weight: 500 !important;
          color: #4B5563 !important;
          margin: 20px 0 12px 0 !important;
          page-break-after: avoid !important;
        }
        .pdf-content p {
          color: #374151 !important;
          line-height: 1.7 !important;
          margin-bottom: 16px !important;
          text-align: justify !important;
        }
        .pdf-content strong {
          font-weight: 600 !important;
          color: #1F2937 !important;
        }
        .pdf-content em {
          font-style: italic !important;
          color: #2563EB !important;
        }
        .pdf-content ul, .pdf-content ol {
          margin: 16px 0 16px 24px !important;
          padding: 0 !important;
        }
        .pdf-content li {
          color: #374151 !important;
          margin-bottom: 8px !important;
          line-height: 1.6 !important;
        }
        .pdf-content .code-block {
          background: black !important;
          border: 1px solid #D1D5DB !important;
          border-radius: 6px !important;
          padding: 16px !important;
          margin: 20px 0 !important;
          font-family: 'Courier New', monospace !important;
          font-size: 12px !important;
          line-height: 1.5 !important;
          overflow-x: auto !important;
          page-break-inside: avoid !important;
        }
        .pdf-content .inline-code {
          background: black !important;
          color: white !important;
          padding: 2px 6px !important;
          border-radius: 4px !important;
          font-family: 'Courier New', monospace !important;
          font-size: 13px !important;
        }
        .pdf-content pre {
          margin: 0 !important;
          white-space: pre-wrap !important;
          word-wrap: break-word !important;
        }
        .pdf-content code {
          font-family: 'Courier New', monospace !important;
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
        backgroundColor: '#ffffff',
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
    <div className="flex lg:flex-row flex-col min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-96 bg-white border-r border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Course Chapters</h2>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-80px)] pb-20">
          <div className="p-6 space-y-3">
            {notes.map((note, index) => {
              const titleMatch = note.notes.match(/<h1[^>]*>(.*?)<\/h1>/);
              const title = titleMatch ? 
                titleMatch[1].replace(/[📚⚛️🚀✨🎯🔧📝💡🌟]/g, '').trim() : 
                `Chapter ${index + 1}`;
              
              return (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedChapter === index 
                      ? 'bg-blue-50 border-blue-200 shadow-sm' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedChapter(index)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className={`text-sm font-medium ${
                      selectedChapter === index ? 'text-blue-700' : 'text-gray-700'
                    }`}>
                      {title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className={`text-xs ${
                      selectedChapter === index ? 'text-blue-600' : 'text-gray-500'
                    }`}>
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
      <div className="flex-1 overflow-hidden">
        <div className="max-w-6xl mx-auto px-12 py-2">
          <div className="flex justify-end mb-2">
            <Button
              onClick={downloadStyledPDF}
              className={`${
                isPdfGenerating 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
              size="sm"
              disabled={notes.length === 0 || isPdfGenerating}
            >
              <Download className={`h-4 w-4 mr-2 ${isPdfGenerating ? 'animate-spin' : ''}`} />
              {isPdfGenerating ? 'Generating PDF...' : 'Download PDF'}
            </Button>
          </div>
          <ScrollArea className="h-screen">
            {notes.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-12">
                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ 
                      __html: formatContent(notes[selectedChapter]?.notes || '') 
                    }} 
                  />
                </div>
              </div>
            )}
            {notes.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Loading course content...</p>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen ? (
          <Button
            onClick={() => setIsChatOpen(true)}
            className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
            size="lg"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        ) : (
          <Card className="w-96 h-96 shadow-xl border-0">
            <CardHeader className="bg-blue-600 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  <CardTitle className="text-sm">AI Study Assistant</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsChatOpen(false)}
                  className="text-white hover:bg-blue-700 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex flex-col h-80">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {chatMessages.length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                      <Bot className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                      <p className="text-sm">Ask me anything about this chapter!</p>
                    </div>
                  )}
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-2 ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div className={`flex gap-2 max-w-xs ${
                        message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}>
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          message.role === 'user' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {message.role === 'user' ? 
                            <User className="h-4 w-4" /> : 
                            <Bot className="h-4 w-4" />
                          }
                        </div>
                        <div className={`p-3 rounded-lg text-sm ${
                          message.role === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {message.content}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-2 justify-start">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="bg-gray-100 p-3 rounded-lg text-sm">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              <Separator />
              <div className="p-4 mb-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about this chapter..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                    className="flex-1 border"
                    disabled={isLoading}
                  />
                  <Button 
                    onClick={sendChatMessage}
                    disabled={!chatInput.trim() || isLoading}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
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
        }
        .inline-code {
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
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
      `}</style>
    </div>
  );
};

export default Notes;
