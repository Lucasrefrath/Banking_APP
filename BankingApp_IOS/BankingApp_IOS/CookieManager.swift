//
//  CookieManager.swift
//  BankingApp_IOS
//
//  Created by Lucas Hermes on 18.06.24.
//

import SwiftUI

class CookieManager {
    static let shared = CookieManager()
    
    @AppStorage("SESSION_COOKIE") var sessionCookie: String = ""

    private init() {}

    func saveCookies(response: HTTPURLResponse) {
        if let headerFields = response.allHeaderFields as? [String: String],
           let url = response.url {
            
            let cookies = HTTPCookie.cookies(withResponseHeaderFields: headerFields, for: url)
            for cookie in cookies {
                print("Saving cookie: \(cookie)")
                if cookie.name == "SESSION" {
                    sessionCookie = cookie.value
                }
                HTTPCookieStorage.shared.setCookie(cookie)
            }
        } else {
            print("No cookies found in response")
        }
    }

    func getCookies(for url: URL) -> [HTTPCookie] {
        print(url)
        let cookies = HTTPCookieStorage.shared.cookies(for: url) ?? []
        for cookie in cookies {
            print("Retrieved cookie: \(cookie)")
        }
        return cookies
    }
    
    func getSessionCookieValue() -> String {
        return sessionCookie
    }

    func deleteAllCookies() {
        if let cookies = HTTPCookieStorage.shared.cookies {
            for cookie in cookies {
                HTTPCookieStorage.shared.deleteCookie(cookie)
                print("Deleted cookie: \(cookie)")
            }
        }
    }
}
