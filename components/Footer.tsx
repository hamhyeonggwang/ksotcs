import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">학회소개</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-primary-400 transition-colors">
                  학회 소개
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary-400 transition-colors">
                  조직도
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary-400 transition-colors">
                  연혁
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">서비스</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/journal" className="hover:text-primary-400 transition-colors">
                  학회지 안내
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-primary-400 transition-colors">
                  학회소식
                </Link>
              </li>
            </ul>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">교육</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/center" className="hover:text-primary-400 transition-colors">
                  교육센터
                </Link>
              </li>
              <li>
                <Link href="/center" className="hover:text-primary-400 transition-colors">
                  교육 프로그램
                </Link>
              </li>
              <li>
                <Link href="/center" className="hover:text-primary-400 transition-colors">
                  세미나
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">연락처</h3>
            <ul className="space-y-2 text-sm">
              <li>대전광역시 유성구 도안대로 311</li>
              <li>12층 4호(용계동)</li>
              <li>대표번호: 010.7631.1778</li>
              <li>사업자등록번호: 715-73-00391</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              Copyright © 2015 대한아동학교작업치료학회. All right reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/about" className="text-sm hover:text-primary-400 transition-colors">
                이용안내
              </Link>
              <Link href="/about" className="text-sm hover:text-primary-400 transition-colors">
                개인정보처리방침
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
