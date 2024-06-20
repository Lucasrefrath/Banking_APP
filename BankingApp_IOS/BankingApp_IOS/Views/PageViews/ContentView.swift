//
//  ContentView.swift
//  BankingApp_IOS
//
//  Created by Lucas Hermes on 15.06.24.
//

import SwiftUI

struct ContentView: View {
    
    @StateObject var authenticationContext = AuthenticationContextHolder.shared
    
    var body: some View {
        if authenticationContext.initAuthStatusPending {
            LoadingSpinner()
        } else {
            if(authenticationContext.isAuthenticated) {
                TabView() {
                            NavigationStack() {
                                HomePageView()
                                    .navigationTitle("Your Accounts")
                            }
                            .tabItem {
                                Text("Home")
                                Image(systemName: "house.fill")
                                    .renderingMode(.template)
                            }
                    
                            NavigationStack() {
                                AuthenticationPageView()
                                    .navigationTitle("Authentication")
                            }
                            .tabItem {
                                Text("Authentication")
                                Image(systemName: "faceid")

                            }
                            .badge(1)
                            
                            NavigationStack() {
                                ProfilePageView()
                                    .navigationTitle("Your Profile")
                            }
                            .tabItem {
                                Label("Profile", systemImage: "person.crop.circle")
                            }
                }
                
            } else {
                LogInPageView()
                    .navigationTitle("Login")
            }
        }
    }
}

#Preview {
    ContentView()
        .onAppear {
            AuthenticationContextHolder.shared.initiateCheckAuth()
        }
}
