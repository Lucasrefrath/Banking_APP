//
//  AuthenticationPage.swift
//  BankingApp_IOS
//
//  Created by Lucas Hermes on 15.06.24.
//

import Foundation
import SwiftUI

struct AuthenticationPageView: View {
    
    @AppStorage("api-token") private var apiToken = "";
    @AppStorage("SESSION_COOKIE") private var sessionCookie = "";
    
    @StateObject var bioAuth = BiometricAuth()
    
    var body: some View {

        VStack {
            Text("No open requests")
        }
    }
}

#Preview {
    AuthenticationPageView()
}
