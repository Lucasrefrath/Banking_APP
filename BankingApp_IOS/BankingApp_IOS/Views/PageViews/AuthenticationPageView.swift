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
        ZStack {
            VStack {
                Text("Authenticate Requests")
                Text(sessionCookie)
                Button(action: {
                    AuthenticationContextHolder.shared.initiateCheckAuth()
                }) {
                    Text("CheckAuth")
                }
            }
            
            if !bioAuth.isUnLocked {
                WaintingForLocalAuthentication()
            }
            
        }
        .onAppear {
            bioAuth.authenticate()
        }
        
    }
}
